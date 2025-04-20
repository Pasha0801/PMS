import { makeAutoObservable } from 'mobx';

import { boardsController } from '#controller/BoardsController';
import { Board } from '#shared/types';
import { ApiError } from '#shared/utils';
import { appModel } from '#view/app';
import { TaskDialog, TaskDialogModelProps } from '#view/features';

export class BoardsPageModel {
  private readonly appModel = appModel;
  private readonly boardsController = boardsController;

  public boards: Board[] = [];

  public isLoading: boolean = true;
  public isError: boolean = false;

  constructor() {
    makeAutoObservable(this);

    this.getBoards();
  }

  public getBoards = async () => {
    const res = await this.boardsController.getBoards();

    if (res instanceof ApiError) {
      this.isError = true;
    } else {
      this.boards = res;
      this.isError = false;
    }

    this.isLoading = false;
  };

  public createNewTask = () => {
    const taskDialogProps: TaskDialogModelProps = {
      board: null,
      disableFieldBoard: false,
      onSuccess: () => this.getBoards(),
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
