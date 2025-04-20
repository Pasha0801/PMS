import { makeAutoObservable } from 'mobx';

import { appModel } from '#view/app';

import { HeaderProps } from '../Header';

export class HeaderModel {
  private readonly appModel = appModel;

  constructor(public props: HeaderProps) {
    makeAutoObservable(this);
  }

  /** Переход на страницу досок */
  public navigateBoardsPage = () => {
    this.appModel.router.navigate('/boards');
  };

  /** Переход на страницу задач */
  public navigateTasksPage = () => {
    this.appModel.router.navigate('/issues');
  };
}
