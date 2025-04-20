import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { QueryService } from '#service/QueryService';
import { Board, Priority, Status, Task } from '#shared/types';
import { ApiError } from '#shared/utils';

import { BoardsController } from './BoardsController';

describe('BoardsController', () => {
  let controller: BoardsController;
  let mock: MockAdapter;
  let axiosInstance: AxiosInstance;

  const mockBoards: Board[] = [
    { id: 1, name: 'Project A', description: 'Main project', taskCount: 2 },
    {
      id: 2,
      name: 'Project B',
      description: 'Secondary project',
      taskCount: 1,
    },
  ];

  const mockTasks: Task[] = [
    {
      id: 101,
      title: 'Task 1',
      description: 'First task',
      priority: Priority.High,
      status: Status.Backlog,
      assignee: {
        id: 1,
        fullName: 'John Doe',
        email: 'john@example.com',
        avatarUrl: 'https://example.com/avatar1.jpg',
      },
      boardId: 1,
      boardName: 'Project A',
    },
    {
      id: 102,
      title: 'Task 2',
      description: 'Second task',
      priority: Priority.Medium,
      status: Status.InProgress,
      assignee: {
        id: 2,
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        avatarUrl: 'https://example.com/avatar2.jpg',
      },
      boardId: 1,
      boardName: 'Project A',
    },
  ];

  beforeEach(() => {
    axiosInstance = axios.create({
      baseURL: 'test-api',
      timeout: 3000,
      headers: { 'Content-Type': 'application/json' },
    });

    mock = new MockAdapter(axiosInstance);
    const queryService = new QueryService(axiosInstance);
    controller = new BoardsController(queryService);

    // Мокаем getBoards по умолчанию
    mock.onGet('/boards').reply(200, { data: mockBoards });
  });

  afterEach(() => {
    mock.reset();
  });

  describe('getBoards', () => {
    it('должен возвращать массив досок при успешном запросе', async () => {
      const result = await controller.getBoards();

      expect(result).toEqual(mockBoards);
      expect(result).not.toBeInstanceOf(ApiError);
    });

    it('должен возвращать ApiError при ошибке сервера', async () => {
      mock.onGet('/boards').reply(500, { message: 'Server Error' });

      const result = await controller.getBoards();

      expect(result).toBeInstanceOf(ApiError);
      expect((result as ApiError).text).toContain('500');
    });

    it('должен возвращать пустой массив при пустом ответе', async () => {
      mock.onGet('/boards').reply(200, { data: [] });

      const result = await controller.getBoards();

      expect(result).toEqual([]);
    });

    it('должен возвращать ApiError при сетевой ошибке', async () => {
      mock.onGet('/boards').networkError();

      const result = await controller.getBoards();

      expect(result).toBeInstanceOf(ApiError);
      expect((result as ApiError).text).toBe('Network Error');
    });
  });

  describe('getTasksOnBoard', () => {
    const boardId = 1;

    it('должен возвращать массив задач с boardId и boardName', async () => {
      mock.onGet(`/boards/${boardId}`).reply(200, { data: mockTasks });

      const result = await controller.getTasksOnBoard(boardId);

      expect(result).toEqual(mockTasks);
      expect(result).not.toBeInstanceOf(ApiError);
    });

    it('должен возвращать ApiError при ошибке запроса задач', async () => {
      mock.onGet(`/boards/${boardId}`).reply(404, { message: 'Not found' });

      const result = await controller.getTasksOnBoard(boardId);

      expect(result).toBeInstanceOf(ApiError);
      expect((result as ApiError).text).toContain('404');
    });

    it('должен возвращать пустой массив при пустом ответе', async () => {
      mock.onGet(`/boards/${boardId}`).reply(200, { data: [] });

      const result = await controller.getTasksOnBoard(boardId);

      expect(result).toEqual([]);
    });

    it('должен возвращать пустой массив если доска не найдена', async () => {
      mock.onGet('/boards').reply(200, { data: [] });
      mock.onGet(`/boards/${boardId}`).reply(200, { data: mockTasks });

      const result = await controller.getTasksOnBoard(boardId);

      expect(result).toEqual([]);
    });

    it('должен возвращать ApiError при сетевой ошибке', async () => {
      mock.onGet(`/boards/${boardId}`).networkError();

      const result = await controller.getTasksOnBoard(boardId);

      expect(result).toBeInstanceOf(ApiError);
      expect((result as ApiError).text).toBe('Network Error');
    });
  });
});
