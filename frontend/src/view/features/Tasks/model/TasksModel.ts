import { makeAutoObservable, runInAction } from 'mobx';
import { tasksController } from '#controller/TasksController';
import { Task } from '#shared/types';
import { ApiError } from '#shared/utils';

export class TasksModel {
  tasks: Task[] = [];
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchTasks(signal?: AbortSignal) {
    this.isLoading = true;
    this.error = null;

    const res = await tasksController.getTasks(signal);

    runInAction(() => {
      this.isLoading = false;
      if (res instanceof ApiError) {
        this.error = res.text;
      } else {
        this.tasks = res;
      }
    });
  }

  async createTask(task: Task, signal?: AbortSignal) {
    this.isLoading = true;
    this.error = null;

    const res = await tasksController.createTask(task, signal);

    runInAction(() => {
      this.isLoading = false;
      if (res instanceof ApiError) {
        this.error = res.text;
      } else {
        this.fetchTasks(); // обновим список после создания
      }
    });
  }

  async updateTask(task: Task, signal?: AbortSignal) {
    this.isLoading = true;
    this.error = null;

    const res = await tasksController.updateTask(task, signal);

    runInAction(() => {
      this.isLoading = false;
      if (res instanceof ApiError) {
        this.error = res.text;
      } else {
        this.fetchTasks(); // обновим список после обновления
      }
    });
  }

  async updateTaskStatus(task: Task, signal?: AbortSignal) {
    this.isLoading = true;
    this.error = null;

    const res = await tasksController.updateTaskStatus(task, signal);

    runInAction(() => {
      this.isLoading = false;
      if (res instanceof ApiError) {
        this.error = res.text;
      } else {
        this.fetchTasks(); // обновим список после смены статуса
      }
    });
  }

  get byStatus() {
    return (status: string) =>
      this.tasks.filter((task) => task.status === status);
  }
}

export const tasksModel = new TasksModel();
