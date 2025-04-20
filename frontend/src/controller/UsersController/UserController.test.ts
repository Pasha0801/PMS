import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { QueryService } from '#service/QueryService';
import { User } from '#shared/types';
import { ApiError } from '#shared/utils';

import { UsersController } from './UsersController';

describe('UsersController', () => {
  let usersController: UsersController;
  let queryService: QueryService;
  let mock: MockAdapter;
  let axiosInstance: AxiosInstance;

  beforeEach(() => {
    // Создаем новый экземпляр axios
    axiosInstance = axios.create({
      baseURL: 'test-api',
      timeout: 3000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Создаем QueryService с замоканным axios
    queryService = new QueryService(axiosInstance);
    mock = new MockAdapter(axiosInstance);

    // Создаем UsersController с QueryService
    usersController = new UsersController(queryService);
  });

  afterEach(() => {
    mock.reset();
  });

  describe('getUsers', () => {
    it('возвращает массив User при успешном запросе', async () => {
      const mockResponse = {
        data: [
          {
            id: 1,
            fullName: 'John Doe',
            email: 'john@example.com',
            avatarUrl: 'https://example.com/avatar1.jpg',
            description: 'Developer',
            tasksCount: 5,
            teamId: 101,
            teamName: 'Team A',
          },
          {
            id: 2,
            fullName: 'Jane Smith',
            email: 'jane@example.com',
            avatarUrl: 'https://example.com/avatar2.jpg',
            description: 'Designer',
            tasksCount: 3,
            teamId: 102,
            teamName: 'Team B',
          },
        ],
      };

      const expectedUsers: User[] = [
        {
          id: 1,
          fullName: 'John Doe',
          email: 'john@example.com',
          avatarUrl: 'https://example.com/avatar1.jpg',
        },
        {
          id: 2,
          fullName: 'Jane Smith',
          email: 'jane@example.com',
          avatarUrl: 'https://example.com/avatar2.jpg',
        },
      ];

      mock.onGet('/users').reply(200, mockResponse);

      const result = await usersController.getUsers();

      expect(result).toEqual(expectedUsers);
      expect(result).not.toBeInstanceOf(ApiError);
    });

    it('возвращает ApiError при ошибке запроса', async () => {
      mock.onGet('/users').reply(500, { message: 'Server Error' });

      const result = await usersController.getUsers();

      expect(result).toBeInstanceOf(ApiError);
      expect((result as ApiError).text).toBe(
        'Request failed with status code 500',
      );
    });

    it('возвращает пустой массив при пустом ответе', async () => {
      const mockResponse = {
        data: [],
      };

      mock.onGet('/users').reply(200, mockResponse);

      const result = await usersController.getUsers();

      expect(result).toEqual([]);
      expect(result).not.toBeInstanceOf(ApiError);
    });

    it('возвращает ApiError при сетевой ошибке', async () => {
      mock.onGet('/users').networkError();

      const result = await usersController.getUsers();

      expect(result).toBeInstanceOf(ApiError);
      expect((result as ApiError).text).toBe('Network Error');
    });
  });
});
