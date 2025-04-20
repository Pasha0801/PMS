import { makeAutoObservable } from 'mobx';

import { Board } from '#shared/types';
import { appModel, AppModel } from '#view/app';

import { BoardsProps } from '../Boards';

export class BoardsModel {
  private readonly appModel: AppModel = appModel;

  public boards: Board[];

  constructor(props: BoardsProps) {
    makeAutoObservable(this);

    this.boards = props.boards;
  }

  /** Переход на страницу доски */
  public navigateBoard = (boardId: number) => {
    const path = '/board/' + boardId;
    this.appModel.router.navigate(path);
  };
}
