import { makeAutoObservable } from 'mobx';

import { boardsController } from '#controller/BoardsController';
import { Board, Task } from '#shared/types';
import { ApiError } from '#shared/utils';
import { appModel } from '#view/app';
import { TaskDialog, TaskDialogModelProps } from '#view/features';

export class BoardPageModel {
  private readonly appModel = appModel;
  private readonly boardsController = boardsController;

  public tasks: Task[] = [];
  public board: Board = {
    description: '',
    id: -1,
    name: '',
    taskCount: -1,
  };

  public isLoading: boolean = true;
  public isError: boolean = false;

  constructor() {
    makeAutoObservable(this);

    this.getBoardTasks();
  }

  private getBoardId = () => {
    const path = appModel.router.getCurrentLocation();
    const match = path.match(/^\/board\/(\d+)$/);
    return match ? +match[1] : null;
  };

  public getBoardTasks = async () => {
    const boardId = this.getBoardId();

    if (!boardId) {
      this.isError = true;
      return;
    }
    const res = await this.boardsController.getTasksOnBoard(boardId);

    if (res instanceof ApiError) {
      this.isError = true;
    } else {
      this.tasks = res.tasks;
      this.board = res.board;
      this.isError = false;
    }

    this.isLoading = false;
  };

  public createNewTask = () => {
    const taskDialogProps: TaskDialogModelProps = {
      board: this.board,
      disableFieldBoard: true,
      onSuccess: () => this.getBoardTasks(),
      showButtonToBoard: false,
      task: null,
      type: 'create',
    };
    this.appModel.dialog.open(TaskDialog(taskDialogProps));
  };

  /** Навигация в случае ошибки загрузки данных*/
  public navigateTasksPage = () => {
    this.appModel.router.navigate('/issues');
  };
}
