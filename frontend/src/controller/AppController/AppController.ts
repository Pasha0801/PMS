import { QueryService, queryService } from '#service/QueryService';

export class AppController {
  constructor(private queryService: QueryService) {}

  /** Прерывает все активные запросы приложения */
  public abortAll(): void {
    this.queryService.abortAll();
  }
}

export const appController = new AppController(queryService);
