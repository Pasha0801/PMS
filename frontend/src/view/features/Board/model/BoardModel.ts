import { makeAutoObservable } from 'mobx';

import {
  BoardsController,
  boardsController,
} from '#controller/BoardsController';
import { Task } from '#shared/types';
import { ApiError } from '#shared/utils';
import { appModel } from '#view/app';
import { TaskDialog, TaskDialogModelProps } from '#view/features/TaskDialog';

export class BoardModel {
  private readonly boardsController: BoardsController = boardsController;
  private tasks: Task[] = [];
  private boardId: number | null = null;
  public titleBoard: string | null = null;
  public isLoading: boolean = true;
  public isError: boolean = false;
  public taskToDo: Task[] = [];
  public taskInProgress: Task[] = [];
  public taskDone: Task[] = [];

  constructor() {
    makeAutoObservable(this);

    this.setBoardId();
    this.getTasks();
    this.setTitleBoard();
  }

  private setBoardId = () => {
    const path = appModel.router.getCurrentLocation();
    const match = path.match(/^\/board\/(\d+)$/);
    this.boardId = match ? +match[1] : null;
  };

  private getTasks = async () => {
    if (this.boardId) {
      const res = await this.boardsController.getTasksOnBoard(this.boardId);
      if (res instanceof ApiError) {
        this.isLoading = false;
        this.isError = true;
      } else {
        this.tasks = res;
        this.filterTasks();
        this.setTitleBoard();
        this.isLoading = false;
        this.isError = false;
      }
    }
  };

  private setTitleBoard = () => {
    if (this.tasks.length > 0) {
      this.titleBoard = this.tasks[0].boardName;
    }
  };

  private filterTasks = () => {
    this.taskToDo = this.tasks.filter(({ status }) => status === 'Backlog');
    this.taskInProgress = this.tasks.filter(
      ({ status }) => status === 'InProgress',
    );
    this.taskDone = this.tasks.filter(({ status }) => status === 'Done');
  };

  public editTask = (task: Task) => {
    const taskDialogProps: TaskDialogModelProps = {
      board: null,
      disableFieldBoard: false,
      onSuccess: () => this.getTasks(),
      showButtonToBoard: false,
      task,
      type: 'edit',
    };
    appModel.dialog.open(TaskDialog(taskDialogProps));
  };

  public navigateTasksPage = () => {
    appModel.router.navigate('/boards');
  };
}
