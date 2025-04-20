import { makeAutoObservable } from 'mobx';
import {
  BoardsController,
  boardsController,
} from '#controller/BoardsController';
import { Board } from '#shared/types';
import { ApiError } from '#shared/utils';
import { appModel, AppModel } from '#view/app';

export class BoardsModel {
  private readonly boardsController: BoardsController = boardsController;
  private readonly appModel: AppModel = appModel;
  public isLoading: boolean = true;
  public isError: boolean = false;
  public boards: Board[] = [];

  constructor() {
    makeAutoObservable(this);

    this.getBoards();
  }

  /**Private  */
  /** Получение всех досок  */
  private getBoards = async () => {
    const res = await this.boardsController.getBoards();
    if (res instanceof ApiError) {
      this.isError = true;
      this.isLoading = false;
    } else {
      this.boards = res;
      this.isLoading = false;
    }
  };

  public navigateBoard = (boardId: string) => {
    const path = '/board/' + boardId;
    this.appModel.router.navigate(path);
  };
}
