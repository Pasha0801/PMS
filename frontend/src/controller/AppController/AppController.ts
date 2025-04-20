import { QueryService, queryService } from '#service/QueryService';
import { StorageService, storageService } from '#service/StorageService';
import { Nullable, Task } from '#shared/types';
import { StorageError } from '#shared/utils';

const CREATE_TASK_DATA_KEY = 'create_task_data';
export class AppController {
  constructor(
    private queryService: QueryService,
    private storageService: StorageService,
  ) {}

  /** Прерывает все активные запросы приложения */
  public abortAll(): void {
    this.queryService.abortAll();
  }

  /** Возвращает из LocalStorage данные из модального окна создания задачи */
  public storageGetCreateTaskData(): Nullable<Task> | StorageError {
    return this.storageService.get<Task>(CREATE_TASK_DATA_KEY);
  }

  /** Устанавливает в LocalStorage данные из модального окна создания задачи */
  public storageSetCreateTaskData(task: Nullable<Task>): true | StorageError {
    return this.storageService.set<Nullable<Task>>(CREATE_TASK_DATA_KEY, task);
  }

  /** Очищает в LocalStorage данные из модального окна создания задачи */
  public storageClearCreateTaskData(): true | StorageError {
    return this.storageService.remove(CREATE_TASK_DATA_KEY);
  }
}

export const appController = new AppController(queryService, storageService);
