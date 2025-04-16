import axios, { isAxiosError } from 'axios';
import { ApiError } from '#shared/utils';

export class QueryService {
  private queryService = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1',
    timeout: 3000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  constructor() {}

  public async get<T>(
    url: string,
    signal?: AbortSignal,
  ): Promise<T | ApiError> {
    try {
      const response = await this.queryService.get<T>(url, { signal });
      return response.data;
    } catch (error) {
      return this.createError(error);
    }
  }

  public async post<T, R>(
    url: string,
    data: T,
    signal?: AbortSignal,
  ): Promise<R | ApiError> {
    try {
      const response = await this.queryService.post<R>(url, data, { signal });
      return response.data;
    } catch (error) {
      return this.createError(error);
    }
  }

  public async put<T, R>(
    url: string,
    data: T,
    signal?: AbortSignal,
  ): Promise<R | ApiError> {
    try {
      const response = await this.queryService.put<R>(url, data, { signal });
      return response.data;
    } catch (error) {
      return this.createError(error);
    }
  }

  private createError(error: unknown): ApiError {
    if (isAxiosError(error)) {
      return new ApiError(error.message);
    }
    return new ApiError('Unexpected error occurred');
  }
}

export const queryService = new QueryService();
