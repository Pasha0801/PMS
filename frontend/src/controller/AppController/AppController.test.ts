import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

import { QueryService } from '#service/QueryService';
import { ApiError } from '#shared/utils';

import { AppController } from './AppController';

// Мокируем import.meta.env
vi.stubEnv('VITE_API_URL', 'test-api');

describe('AppController', () => {
  let appController: AppController;
  let queryService: QueryService;
  let mock: MockAdapter;
  let axiosInstance: AxiosInstance;

  beforeEach(() => {
    // Создаем новый экземпляр axios
    axiosInstance = axios.create({
      baseURL: 'test-api',
      timeout: 100, // Уменьшенный таймаут для тестов
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Создаем QueryService с замоканным axios
    queryService = new QueryService(axiosInstance);
    mock = new MockAdapter(axiosInstance);

    // Создаем AppController с QueryService
    appController = new AppController(queryService);
  });

  afterEach(() => {
    mock.reset();
  });

  describe('abortAll', () => {
    it('вызывает queryService.abortAll один раз', () => {
      // Шпионим за методом abortAll в QueryService
      const abortAllSpy = vi.spyOn(queryService, 'abortAll');

      // Вызываем метод
      appController.abortAll();

      // Проверяем, что abortAll был вызван один раз
      expect(abortAllSpy).toHaveBeenCalledTimes(1);
    });

    it('прерывает активные запросы через queryService', async () => {
      // Настраиваем мок для долгого запроса
      mock
        .onGet('/test')
        .reply(
          () =>
            new Promise((resolve) =>
              setTimeout(() => resolve([200, { data: 'ok' }]), 100),
            ),
        );

      // Шпионим за методом get для проверки вызова
      const getSpy = vi.spyOn(axiosInstance, 'get');

      // Запускаем запрос
      const requestPromise = queryService.get('/test');

      // Даем запросу начать выполнение
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Проверяем, что запрос был отправлен
      expect(getSpy).toHaveBeenCalledWith('/test', expect.any(Object));

      // Вызываем abortAll через AppController
      appController.abortAll();

      // Ожидаем завершения запроса
      const result = await requestPromise;

      // Проверяем, что запрос был прерван
      expect(result).toBeInstanceOf(ApiError);
      expect((result as ApiError).text).toMatch(
        /canceled|Request aborted|Operation canceled/,
      );

      // Проверяем, что abortControllers очищены
      expect(queryService['abortControllers'].size).toBe(0);
    });
  });
});
