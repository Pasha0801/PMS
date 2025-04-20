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
  constructor(private queryService: QueryService) {}

  public async getBoards(): Promise<Board[] | ApiError> {
    const res = await this.queryService.get<GetBoardsResponse>('/boards');

    if (res instanceof ApiError) {
      return res;
    }

    return res.data;
  }

  public async getTasksOnBoard(boardId: number): Promise<Task[] | ApiError> {
    const res = await this.queryService.get<GetTasksOnBoardResponse>(
      `/boards/${boardId}`,
    );

    if (res instanceof ApiError) {
      return res;
    }

    const boards = await this.getBoards();

    if (boards instanceof ApiError) {
      return [];
    }

    const board = boards.find(({ id }) => id === boardId);

    if (!board) {
      return [];
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
