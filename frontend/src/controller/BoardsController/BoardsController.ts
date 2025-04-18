import { QueryService, queryService } from '#service/QueryService';
import { User, Board, Priority, Status, Task } from '#shared/types';
import { ApiError } from '#shared/utils';

// getBoards
type GetBoardsResponse = {
  data: Board[];
};

// getTasksOnBoard
type GetTasksOnBoardResponse = {
  data: {
    id: number;
    title: string;
    description: string;
    priority: Priority;
    status: Status;
    assignee: User;
  }[];
};

export class BoardsController {
  private queryService: QueryService;

  constructor(queryService: QueryService) {
    this.queryService = queryService;
  }

  public async getBoards(signal?: AbortSignal): Promise<Board[] | ApiError> {
    const res = await this.queryService.get<GetBoardsResponse>(
      '/boards',
      signal,
    );

    if (res instanceof ApiError) {
      return res;
    }

    return res.data;
  }

  public async getTasksOnBoard(
    board: Board,
    signal?: AbortSignal,
  ): Promise<Task[] | ApiError> {
    const res = await this.queryService.get<GetTasksOnBoardResponse>(
      `/boards/${board.id}`,
      signal,
    );

    if (res instanceof ApiError) {
      return res;
    }

    const tasks: Task[] = res.data.map((task) => ({
      ...task,
      boardId: board.id,
      boardName: board.name,
    }));

    return tasks;
  }
}

export const boardsController = new BoardsController(queryService);
