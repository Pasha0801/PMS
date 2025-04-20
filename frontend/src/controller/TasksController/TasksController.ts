import { QueryService, queryService } from '#service/QueryService';
import { Task, Status, Priority } from '#shared/types';
import { ApiError } from '#shared/utils';

// getTasks
type GetTasksResponse = {
  data: Task[];
};

// createTask
type CreateTaskRequest = {
  boardId: number;
  description: string;
  priority: Priority;
  title: string;
  assigneeId: number;
};

type ID = {
  id: number;
};

type CreateTaskResponse = {
  data: ID;
};

// updateTask
type UpdateTaskRequest = {
  description: string;
  title: string;
  assigneeId: number;
  priority?: Priority;
  status?: Status;
};

type Message = {
  message: string;
};

type UpdateTaskResponse = {
  data: Message;
};

// updateTaskStatus
type UpdateTaskStatusRequest = {
  status: Status;
};

type UpdateTaskStatusResponse = {
  data: Message;
};

export class TasksController {
  constructor(private queryService: QueryService) {}

  public async getTasks(): Promise<Task[] | ApiError> {
    const res = await this.queryService.get<GetTasksResponse>('/tasks');

    if (res instanceof ApiError) {
      return res;
    }

    return res.data;
  }

  public async createTask(task: Task): Promise<ID | ApiError> {
    const createTaskData: CreateTaskRequest = {
      boardId: task.boardId,
      description: task.description,
      priority: task.priority,
      title: task.title,
      assigneeId: task.assignee.id,
    };

    const res = await this.queryService.post<
      CreateTaskRequest,
      CreateTaskResponse
    >('/tasks/create', createTaskData);

    if (res instanceof ApiError) {
      return res;
    }

    return res.data;
  }

  public async updateTask(task: Task): Promise<Message | ApiError> {
    const updateTaskData: UpdateTaskRequest = {
      description: task.description,
      title: task.title,
      assigneeId: task.assignee.id,
      priority: task.priority,
      status: task.status,
    };

    const res = await this.queryService.put<
      UpdateTaskRequest,
      UpdateTaskResponse
    >(`/tasks/update/${task.id}`, updateTaskData);

    if (res instanceof ApiError) {
      return res;
    }

    return res.data;
  }

  public async updateTaskStatus(task: Task): Promise<Message | ApiError> {
    const updateTaskStatusData: UpdateTaskStatusRequest = {
      status: task.status,
    };

    const res = await this.queryService.put<
      UpdateTaskStatusRequest,
      UpdateTaskStatusResponse
    >(`/tasks/updateStatus/${task.id}`, updateTaskStatusData);

    if (res instanceof ApiError) {
      return res;
    }

    return res.data;
  }

  public get priorities() {
    return [Priority.Low, Priority.Medium, Priority.High];
  }

  public get statuses() {
    return [Status.Backlog, Status.InProgress, Status.Done];
  }
}

export const tasksController = new TasksController(queryService);
