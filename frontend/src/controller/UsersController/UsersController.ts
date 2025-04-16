import { QueryService, queryService } from '#service/QueryService';
import { AssigneeUserForTask, Task } from '#shared/types';

type GetUsersResponse = Pick<
  AssigneeUserForTask,
  'avatarUrl' | 'email' | 'fullName' | 'id'
> & {
  description: string;
  tasksCount: number;
  teamId: number;
  teamName: string;
};

type GetUserTasksResponse = Pick<
  Task,
  'boardName' | 'description' | 'id' | 'priority' | 'status' | 'title'
>;

export class UsersController {
  private queryServiceUsers: QueryService;

  constructor(queryService: QueryService) {
    this.queryServiceUsers = queryService;
  }

  public async getUsers(signal?: AbortSignal) {
    const users = await this.queryServiceUsers.get<GetUsersResponse[]>(
      '/users',
      signal,
    );
    return users;
  }

  public async getUserTasks(userId: number, signal?: AbortSignal) {
    const users = await this.queryServiceUsers.get<GetUserTasksResponse[]>(
      `users/${userId}/tasks`,
      signal,
    );
    return users;
  }
}

export const usersController = new UsersController(queryService);
