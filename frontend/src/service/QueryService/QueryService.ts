import axios, { AxiosInstance, isAxiosError } from 'axios';

import { ApiError } from '#shared/utils';

export class QueryService {
  private query: AxiosInstance;

  /** Список аборт контроллеров текущих запросов */
  private abortControllers: Set<AbortController> = new Set();

  constructor(axiosInstance: AxiosInstance) {
    this.query = axiosInstance;
  }

  /** Выполняет GET запрос по указанному url */
  public async get<R>(url: string): Promise<R | ApiError> {
    const controller = new AbortController();
    this.abortControllers.add(controller);

    try {
      const response = await this.query.get<R>(url, {
        signal: controller.signal,
      });
      return response.data;
    } catch (error) {
      return QueryService.createError(error);
    } finally {
      this.abortControllers.delete(controller);
    }
  }

  /** Выполняет POST запрос с данными по указанному url */
  public async post<T, R>(url: string, data: T): Promise<R | ApiError> {
    const controller = new AbortController();
    this.abortControllers.add(controller);

    try {
      const response = await this.query.post<R>(url, data, {
        signal: controller.signal,
      });
      return response.data;
    } catch (error) {
      return QueryService.createError(error);
    } finally {
      this.abortControllers.delete(controller);
    }
  }

  /** Выполняет PUT запрос с данными по указанному url */
  public async put<T, R>(url: string, data: T): Promise<R | ApiError> {
    const controller = new AbortController();
    this.abortControllers.add(controller);

    try {
      const response = await this.query.put<R>(url, data, {
        signal: controller.signal,
      });
      return response.data;
    } catch (error) {
      return QueryService.createError(error);
    } finally {
      this.abortControllers.delete(controller);
    }
  }

  /** Прерывает все активные запросы */
  public abortAll(): void {
    for (const controller of this.abortControllers) {
      controller.abort();
    }
    this.abortControllers.clear();
  }

  /** Создает ApiError из переданной ошибки */
  public static createError(error: unknown): ApiError {
    if (isAxiosError(error)) {
      return new ApiError(error.message);
    }
    return new ApiError('Unexpected error occurred');
  }
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const queryService = new QueryService(axiosInstance);
