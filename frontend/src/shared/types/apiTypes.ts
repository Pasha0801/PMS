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

export type User = {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string;
};

export type Task = {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  assignee: User;
  boardId: number;
  boardName: string;
};
