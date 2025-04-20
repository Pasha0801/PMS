import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { QueryService } from '#service/QueryService';
import { Priority, Status, Task } from '#shared/types';
import { ApiError } from '#shared/utils';

import { TasksController } from './TasksController';

describe('TaskController', () => {
  let taskController: TasksController;
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

    // Создаем TaskController с QueryService
    taskController = new TasksController(queryService);
  });

  afterEach(() => {
    mock.reset();
  });

  describe('getTasks', () => {
    it('возвращает массив Task при успешном запросе', async () => {
      const mockResponse = {
        data: [
          {
            id: 101,
            title: 'Task 1',
            description: 'First task',
            priority: Priority.High,
            status: Status.InProgress,
            assignee: {
              id: 1,
              fullName: 'John Doe',
              email: 'john@example.com',
              avatarUrl: 'https://example.com/avatar1.jpg',
            },
            boardId: 1,
            boardName: 'Project A',
          },
        ],
      };

      mock.onGet('/tasks').reply(200, mockResponse);

      const result = await taskController.getTasks();

      expect(result).toEqual(mockResponse.data);
      expect(result).not.toBeInstanceOf(ApiError);
    });

    it('возвращает ApiError при ошибке запроса', async () => {
      mock.onGet('/tasks').reply(500, { message: 'Server Error' });

      const result = await taskController.getTasks();

      expect(result).toBeInstanceOf(ApiError);
      expect((result as ApiError).text).toBe(
        'Request failed with status code 500',
      );
    });

    it('возвращает пустой массив при пустом ответе', async () => {
      const mockResponse = {
        data: [],
      };

      mock.onGet('/tasks').reply(200, mockResponse);

      const result = await taskController.getTasks();

      expect(result).toEqual([]);
      expect(result).not.toBeInstanceOf(ApiError);
    });

    it('возвращает ApiError при сетевой ошибке', async () => {
      mock.onGet('/tasks').networkError();

      const result = await taskController.getTasks();

      expect(result).toBeInstanceOf(ApiError);
      expect((result as ApiError).text).toBe('Network Error');
    });
  });

  describe('createTask', () => {
    const mockTask: Task = {
      id: 101,
      title: 'Task 1',
      description: 'First task',
      priority: Priority.High,
      status: Status.InProgress,
      assignee: {
        id: 1,
        fullName: 'John Doe',
        email: 'john@example.com',
        avatarUrl: 'https://example.com/avatar1.jpg',
      },
      boardId: 1,
      boardName: 'Project A',
    };

    it('возвращает ID при успешном создании задачи', async () => {
      const mockResponse = {
        data: { id: 101 },
      };

      const expectedRequest = {
        boardId: mockTask.boardId,
        description: mockTask.description,
        priority: mockTask.priority,
        title: mockTask.title,
        assigneeId: mockTask.assignee.id,
      };

      mock.onPost('/tasks/create', expectedRequest).reply(200, mockResponse);

      const result = await taskController.createTask(mockTask);

      expect(result).toEqual(mockResponse.data);
      expect(result).not.toBeInstanceOf(ApiError);
    });

    it('возвращает ApiError при ошибке создания задачи', async () => {
      const expectedRequest = {
        boardId: mockTask.boardId,
        description: mockTask.description,
        priority: mockTask.priority,
        title: mockTask.title,
        assigneeId: mockTask.assignee.id,
      };

      mock
        .onPost('/tasks/create', expectedRequest)
        .reply(400, { message: 'Invalid data' });

      const result = await taskController.createTask(mockTask);

      expect(result).toBeInstanceOf(ApiError);
      expect((result as ApiError).text).toBe(
        'Request failed with status code 400',
      );
    });

    it('возвращает ApiError при сетевой ошибке', async () => {
      const expectedRequest = {
        boardId: mockTask.boardId,
        description: mockTask.description,
        priority: mockTask.priority,
        title: mockTask.title,
        assigneeId: mockTask.assignee.id,
      };

      mock.onPost('/tasks/create', expectedRequest).networkError();

      const result = await taskController.createTask(mockTask);

      expect(result).toBeInstanceOf(ApiError);
      expect((result as ApiError).text).toBe('Network Error');
    });
  });

  describe('updateTask', () => {
    const mockTask: Task = {
      id: 101,
      title: 'Updated Task',
      description: 'Updated description',
      priority: Priority.Medium,
      status: Status.Done,
      assignee: {
        id: 2,
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        avatarUrl: 'https://example.com/avatar2.jpg',
      },
      boardId: 1,
      boardName: 'Project A',
    };

    it('возвращает Message при успешном обновлении задачи', async () => {
      const mockResponse = {
        data: { message: 'Task updated successfully' },
      };

      const expectedRequest = {
        description: mockTask.description,
        title: mockTask.title,
        assigneeId: mockTask.assignee.id,
        priority: mockTask.priority,
        status: mockTask.status,
      };

      mock
        .onPut(`/tasks/update/${mockTask.id}`, expectedRequest)
        .reply(200, mockResponse);

      const result = await taskController.updateTask(mockTask);

      expect(result).toEqual(mockResponse.data);
      expect(result).not.toBeInstanceOf(ApiError);
    });

    it('возвращает ApiError при ошибке обновления задачи', async () => {
      const expectedRequest = {
        description: mockTask.description,
        title: mockTask.title,
        assigneeId: mockTask.assignee.id,
        priority: mockTask.priority,
        status: mockTask.status,
      };

      mock
        .onPut(`/tasks/update/${mockTask.id}`, expectedRequest)
        .reply(404, { message: 'Task not found' });

      const result = await taskController.updateTask(mockTask);

      expect(result).toBeInstanceOf(ApiError);
      expect((result as ApiError).text).toBe(
        'Request failed with status code 404',
      );
    });

    it('возвращает ApiError при сетевой ошибке', async () => {
      const expectedRequest = {
        description: mockTask.description,
        title: mockTask.title,
        assigneeId: mockTask.assignee.id,
        priority: mockTask.priority,
        status: mockTask.status,
      };

      mock
        .onPut(`/tasks/update/${mockTask.id}`, expectedRequest)
        .networkError();

      const result = await taskController.updateTask(mockTask);

      expect(result).toBeInstanceOf(ApiError);
      expect((result as ApiError).text).toBe('Network Error');
    });
  });

  describe('updateTaskStatus', () => {
    const mockTask: Task = {
      id: 101,
      title: 'Task 1',
      description: 'First task',
      priority: Priority.High,
      status: Status.Done,
      assignee: {
        id: 1,
        fullName: 'John Doe',
        email: 'john@example.com',
        avatarUrl: 'https://example.com/avatar1.jpg',
      },
      boardId: 1,
      boardName: 'Project A',
    };

    it('возвращает Message при успешном обновлении статуса задачи', async () => {
      const mockResponse = {
        data: { message: 'Status updated successfully' },
      };

      const expectedRequest = {
        status: mockTask.status,
      };

      mock
        .onPut(`/tasks/updateStatus/${mockTask.id}`, expectedRequest)
        .reply(200, mockResponse);

      const result = await taskController.updateTaskStatus(mockTask);

      expect(result).toEqual(mockResponse.data);
      expect(result).not.toBeInstanceOf(ApiError);
    });

    it('возвращает ApiError при ошибке обновления статуса задачи', async () => {
      const expectedRequest = {
        status: mockTask.status,
      };

      mock
        .onPut(`/tasks/updateStatus/${mockTask.id}`, expectedRequest)
        .reply(404, { message: 'Task not found' });

      const result = await taskController.updateTaskStatus(mockTask);

      expect(result).toBeInstanceOf(ApiError);
      expect((result as ApiError).text).toBe(
        'Request failed with status code 404',
      );
    });

    it('возвращает ApiError при сетевой ошибке', async () => {
      const expectedRequest = {
        status: mockTask.status,
      };

      mock
        .onPut(`/tasks/updateStatus/${mockTask.id}`, expectedRequest)
        .networkError();

      const result = await taskController.updateTaskStatus(mockTask);

      expect(result).toBeInstanceOf(ApiError);
      expect((result as ApiError).text).toBe('Network Error');
    });
  });

  describe('priorities', () => {
    it('возвращает массив всех приоритетов', () => {
      const expectedPriorities = [Priority.Low, Priority.Medium, Priority.High];
      expect(taskController.priorities).toEqual(expectedPriorities);
    });
  });

  describe('statuses', () => {
    it('возвращает массив всех статусов', () => {
      const expectedStatuses = [Status.Backlog, Status.InProgress, Status.Done];
      expect(taskController.statuses).toEqual(expectedStatuses);
    });
  });
});
