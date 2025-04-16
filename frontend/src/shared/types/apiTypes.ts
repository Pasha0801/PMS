export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export enum Status {
  Backlog = 'Backlog',
  InProgress = 'InProgress',
  Done = 'Done',
}

export type Board = {
  id: number;
  description: string;
  name: string;
  taskCount: number;
};

export type AssigneeUserForTask = {
  avatarUrl: string;
  email: string;
  fullName: string;
  id: number;
};

export type Task = {
  assignee: AssigneeUserForTask;
  boardId: number;
  boardName: string;
  description: string;
  id: number;
  priority: Priority;
  status: Status;
  title: string;
};
