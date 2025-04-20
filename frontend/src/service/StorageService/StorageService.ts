import { StorageError } from '#shared/utils';

export class StorageService {
  /** Получает значение из localStorage по ключу */
  public get<T>(key: string): T | StorageError {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return StorageService.createError(
          `Failed to get item with key "${key}"`,
        );
      }
      const data: T = JSON.parse(item);
      return data;
    } catch (error) {
      return StorageService.createError(
        `Failed to parse item with key "${key}"`,
      );
    }
  }

  /** Сохраняет значение в localStorage по ключу */
  public set<T>(key: string, data: T): true | StorageError {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
      return true;
    } catch (error) {
      return StorageService.createError(`Failed to set item with key "${key}"`);
    }
  }

  /** Удаляет значение из localStorage по ключу */
  public remove(key: string): true | StorageError {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      return StorageService.createError(
        `Failed to remove item with key "${key}"`,
      );
    }
  }

  /** Создает StorageError из переданной ошибки */
  public static createError(message?: string): StorageError {
    return new StorageError(message ?? 'An error occurred with localStorage');
  }
}

export const storageService = new StorageService();
