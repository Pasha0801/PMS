import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { ApiError } from '#shared/utils';

import { QueryService } from './QueryService';

describe('QueryService', () => {
  let queryService: QueryService;
  let mock: MockAdapter;
  let axiosInstance: AxiosInstance;

  beforeEach(() => {
    // Создаем новый экземпляр axios с нужной конфигурацией
    axiosInstance = axios.create({
      baseURL: 'test-api',
      timeout: 3000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    queryService = new QueryService(axiosInstance);
    mock = new MockAdapter(axiosInstance);
  });

  afterEach(() => {
    mock.reset();
  });

  describe('get', () => {
    it('возвращает данные при успешном GET-запросе', async () => {
      const mockData = { id: 1, name: 'test' };
      mock.onGet('/test').reply(200, mockData);

      const result = await queryService.get<{ id: number; name: string }>(
        '/test',
      );

      expect(result).toEqual(mockData);
      expect(result).not.toBeInstanceOf(ApiError);
    });

    it('возвращает ApiError при ошибке сервера', async () => {
      mock.onGet('/test').reply(400, { message: 'Bad Request' });

      const result = await queryService.get('/test');

      expect(result).toBeInstanceOf(ApiError);
      expect((result as ApiError).text).toBe(
        'Request failed with status code 400',
      );
    });

    it('возвращает ApiError при сетевой ошибке', async () => {
      mock.onGet('/test').networkError();

      const result = await queryService.get('/test');

      expect(result).toBeInstanceOf(ApiError);
      expect((result as ApiError).text).toBe('Network Error');
    });
  });

  describe('post', () => {
    it('возвращает данные при успешном POST-запросе', async () => {
      const mockData = { id: 2, name: 'posted' };
      const inputData = { name: 'test' };
      mock.onPost('/test', inputData).reply(200, mockData);

      const result = await queryService.post<
        { name: string },
        { id: number; name: string }
      >('/test', inputData);

      expect(result).toEqual(mockData);
      expect(result).not.toBeInstanceOf(ApiError);
    });

    it('возвращает ApiError при ошибке сервера', async () => {
      mock.onPost('/test').reply(500, { message: 'Server Error' });

      const result = await queryService.post('/test', { name: 'test' });

      expect(result).toBeInstanceOf(ApiError);
      expect((result as ApiError).text).toBe(
        'Request failed with status code 500',
      );
    });

    it('возвращает ApiError при сетевой ошибке', async () => {
      mock.onPost('/test').networkError();

      const result = await queryService.post('/test', { name: 'test' });

      expect(result).toBeInstanceOf(ApiError);
      expect((result as ApiError).text).toBe('Network Error');
    });
  });

  describe('put', () => {
    it('возвращает данные при успешном PUT-запросе', async () => {
      const mockData = { id: 3, name: 'updated' };
      const inputData = { name: 'test' };
      mock.onPut('/test', inputData).reply(200, mockData);

      const result = await queryService.put<
        { name: string },
        { id: number; name: string }
      >('/test', inputData);

      expect(result).toEqual(mockData);
      expect(result).not.toBeInstanceOf(ApiError);
    });

    it('возвращает ApiError при ошибке сервера', async () => {
      mock.onPut('/test').reply(403, { message: 'Forbidden' });

      const result = await queryService.put('/test', { name: 'test' });

      expect(result).toBeInstanceOf(ApiError);
      expect((result as ApiError).text).toBe(
        'Request failed with status code 403',
      );
    });

    it('возвращает ApiError при сетевой ошибке', async () => {
      mock.onPut('/test').networkError();

      const result = await queryService.put('/test', { name: 'test' });

      expect(result).toBeInstanceOf(ApiError);
      expect((result as ApiError).text).toBe('Network Error');
    });
  });

  describe('createError', () => {
    it('создает ApiError из AxiosError', () => {
      const axiosError = {
        message: 'Request failed with status code 404',
        isAxiosError: true,
      };

      const result = QueryService.createError(axiosError);

      expect(result).toBeInstanceOf(ApiError);
      expect(result.text).toBe('Request failed with status code 404');
    });

    it('создает ApiError для неизвестных ошибок', () => {
      const unknownError = new Error('Something went wrong');
      const result = QueryService.createError(unknownError);

      expect(result).toBeInstanceOf(ApiError);
      expect(result.text).toBe('Unexpected error occurred');
    });
  });

  describe('abortAll', () => {
    it('прерывает все активные запросы', async () => {
      mock.onGet('/test').timeout();

      const requestPromise = queryService.get('/test');
      queryService.abortAll();

      const result = await requestPromise;

      expect(result).toBeInstanceOf(ApiError);
      expect((result as ApiError).text).toBe('canceled');
    });
  });
});
