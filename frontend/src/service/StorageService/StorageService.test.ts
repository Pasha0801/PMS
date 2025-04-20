import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { StorageError } from '#shared/utils';

import { StorageService, storageService } from './StorageService';

interface TestData {
  id: number;
  value: string;
}

// Создаем мок для localStorage API
const createLocalStorageMock = () => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string): string | null => store[key] ?? null),
    setItem: vi.fn((key: string, value: string): void => {
      // Имитация возможной ошибки (например, QuotaExceededError)
      if (key === 'throwSetError') {
        throw new Error('Simulated localStorage set error');
      }
      store[key] = String(value); // localStorage сохраняет все как строки
    }),
    removeItem: vi.fn((key: string): void => {
      if (key === 'throwRemoveError') {
        throw new Error('Simulated localStorage remove error');
      }
      delete store[key];
    }),
    clear: vi.fn((): void => {
      store = {};
    }),
    // Вспомогательная функция для проверки состояния мока (необязательно)
    getStore: () => store,
  };
};

// Типизируем мок для удобства
type LocalStorageMock = ReturnType<typeof createLocalStorageMock>;

describe('StorageService', () => {
  let mockLocalStorage: LocalStorageMock;
  const testKey = 'testItem';
  const testData: TestData = { id: 1, value: 'data' };
  const testDataString = JSON.stringify(testData);

  beforeEach(() => {
    // Создаем новый мок перед каждым тестом
    mockLocalStorage = createLocalStorageMock();
    // Подменяем глобальный объект localStorage нашим моком
    vi.stubGlobal('localStorage', mockLocalStorage);
    // Примечание: Мы тестируем импортированный экземпляр `storageService`
  });

  afterEach(() => {
    // Очищаем мок и восстанавливаем исходные глобальные объекты/шпионы
    mockLocalStorage.clear();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  describe('get', () => {
    it('возвращает распарсенные данные, если ключ существует', () => {
      // Подготовка: добавляем данные в мок
      mockLocalStorage.setItem(testKey, testDataString);

      const result = storageService.get<TestData>(testKey);

      // Проверка: вызван ли getItem с правильным ключом
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(testKey);
      // Проверка: результат соответствует ожидаемым данным
      expect(result).toEqual(testData);
      // Проверка: результат не является ошибкой
      expect(result).not.toBeInstanceOf(StorageError);
    });

    it('возвращает StorageError, если ключ не существует', () => {
      const result = storageService.get<TestData>('nonExistentKey');

      // Проверка: вызван ли getItem
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('nonExistentKey');
      // Проверка: результат является ошибкой
      expect(result).toBeInstanceOf(StorageError);
      // Проверка: сообщение об ошибке соответствует ожидаемому
      expect((result as StorageError).text).toContain(
        'Failed to get item with key "nonExistentKey"',
      );
    });

    it('возвращает StorageError, если данные не являются валидным JSON', () => {
      const invalidJson = '{ id: 1, value: "data" '; // Незакрытая скобка
      mockLocalStorage.setItem(testKey, invalidJson);

      const result = storageService.get<TestData>(testKey);

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(testKey);
      expect(result).toBeInstanceOf(StorageError);
      expect((result as StorageError).text).toContain(
        `Failed to parse item with key "${testKey}"`,
      );
    });
  });

  describe('set', () => {
    it('сохраняет данные в localStorage и возвращает true', () => {
      const result = storageService.set<TestData>(testKey, testData);

      // Проверка: возвращаемое значение
      expect(result).toBe(true);
      // Проверка: вызван ли setItem с правильным ключом и СТРОКОВЫМ представлением данных
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        testKey,
        testDataString,
      );
      // Проверка: данные действительно сохранены в моке (опционально)
      expect(mockLocalStorage.getStore()[testKey]).toBe(testDataString);
    });

    it('возвращает StorageError при ошибке сохранения', () => {
      const errorKey = 'throwSetError'; // Используем ключ, который триггерит ошибку в моке
      const result = storageService.set<TestData>(errorKey, testData);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        errorKey,
        testDataString,
      );
      expect(result).toBeInstanceOf(StorageError);
      expect((result as StorageError).text).toContain(
        `Failed to set item with key "${errorKey}"`,
      );
    });
  });

  describe('remove', () => {
    it('удаляет данные из localStorage и возвращает true', () => {
      // Сначала добавим данные
      mockLocalStorage.setItem(testKey, testDataString);
      expect(mockLocalStorage.getStore()[testKey]).toBe(testDataString); // Убедимся, что они там

      const result = storageService.remove(testKey);

      // Проверка: возвращаемое значение
      expect(result).toBe(true);
      // Проверка: вызван ли removeItem с правильным ключом
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(testKey);
      // Проверка: данные действительно удалены из мока
      expect(mockLocalStorage.getStore()[testKey]).toBeUndefined();
      // или expect(mockLocalStorage.getItem(testKey)).toBeNull();
    });

    it('возвращает true, даже если ключ не существует (стандартное поведение)', () => {
      const result = storageService.remove('nonExistentKey');

      expect(result).toBe(true);
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(
        'nonExistentKey',
      );
    });

    it('возвращает StorageError при ошибке удаления', () => {
      const errorKey = 'throwRemoveError';
      // Добавим данные, чтобы было что удалять
      mockLocalStorage.setItem(errorKey, testDataString);

      const result = storageService.remove(errorKey);

      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(errorKey);
      expect(result).toBeInstanceOf(StorageError);
      expect((result as StorageError).text).toContain(
        `Failed to remove item with key "${errorKey}"`,
      );
    });
  });

  describe('createError', () => {
    it('создает StorageError с переданным сообщением', () => {
      const message = 'Specific storage error';
      const error = StorageService.createError(message);

      expect(error).toBeInstanceOf(StorageError);
      expect(error.text).toBe(message);
    });

    it('создает StorageError с сообщением по умолчанию, если сообщение не передано', () => {
      const error = StorageService.createError();

      expect(error).toBeInstanceOf(StorageError);
      expect(error.text).toBe('An error occurred with localStorage');
    });
  });
});
