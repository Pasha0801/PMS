import { QueryService, queryService } from '#service/QueryService';
import { Board, AssigneeUserForTask, Task } from '#shared/types';

type GetTasksOnBoardResponse = Pick<
  Task,
  'description' | 'id' | 'priority' | 'status' | 'title'
> & {
  assignee: AssigneeUserForTask;
};

export class BoardsController {
  private queryService: QueryService;

  constructor(queryService: QueryService) {
    this.queryService = queryService;
  }

  public async getBoards(signal?: AbortSignal) {
    const boards = await this.queryService.get<Board[]>('/boards', signal);
    return boards;
  }

  public async getTasksOnBoard(boardId: number, signal?: AbortSignal) {
    const tasks = await this.queryService.get<GetTasksOnBoardResponse[]>(
      `/boards/${boardId}`,
      signal,
    );
    return tasks;
  }
}

export const boardsController = new BoardsController(queryService);
