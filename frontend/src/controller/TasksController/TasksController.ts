import { QueryService, queryService } from '#service/QueryService';
import { Task, Status, Priority } from '#shared/types';

type CreateTaskResponse = {
  id: number;
};

type UpdateTaskResponse = {
  message: string;
};

type UpdateTaskStatusResponse = {
  message: string;
};

type CreateTaskRequest = Pick<
  Task,
  'boardId' | 'description' | 'priority' | 'title'
> & { assigneeId: number };

type GetTasksByIdRequest = {
  taskId: number;
};

type UpdateTaskStatusRequest = Pick<Task, 'status'>;

type GetTaskByIdResponse = Omit<Task, 'boardId'>;

type UpdateTaskRequest = Pick<Task, 'description' | 'title'> & {
  assigneeId: number;
  priority?: Priority;
  status?: Status;
};

export class TaskController {
  private queryServiceTasks: QueryService;

  constructor(queryService: QueryService) {
    this.queryServiceTasks = queryService;
  }

  public async getTasks(signal?: AbortSignal) {
    const tasks = await this.queryServiceTasks.get<Task[]>('/tasks', signal);
    return tasks;
  }

  public async getTaskById(taskId: GetTasksByIdRequest, signal?: AbortSignal) {
    const task = await this.queryServiceTasks.get<GetTaskByIdResponse>(
      `/tasks/${taskId}`,
      signal,
    );
    return task;
  }

  public async createTask(task: CreateTaskRequest, signal?: AbortSignal) {
    const resultCreateTask = await this.queryServiceTasks.post<
      CreateTaskRequest,
      CreateTaskResponse
    >('/tasks/create', task, signal);
    return resultCreateTask;
  }

  public async updateTask(
    taskId: number,
    task: UpdateTaskRequest,
    signal?: AbortSignal,
  ) {
    const resultUpdateTask = await this.queryServiceTasks.put<
      UpdateTaskRequest,
      UpdateTaskResponse
    >(`/tasks/${taskId}`, task, signal);
    return resultUpdateTask;
  }

  public async updateTaskStatus(
    taskId: number,
    status: UpdateTaskStatusRequest,
    signal?: AbortSignal,
  ) {
    const resultUpdateTaskStatus = await this.queryServiceTasks.put<
      UpdateTaskStatusRequest,
      UpdateTaskStatusResponse
    >(`/tasks/updateStatus/${taskId}`, status, signal);
    return resultUpdateTaskStatus;
  }
}

export const tasksController = new TaskController(queryService);
