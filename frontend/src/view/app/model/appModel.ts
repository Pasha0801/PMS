import { configure, makeAutoObservable } from 'mobx';

import { dialogModel } from './dialogModel';
import { routerModel } from './routerModel';

configure({
  enforceActions: 'never',
});

export class AppModel {
  public readonly dialog = dialogModel;
  public readonly router = routerModel;

  constructor() {
    makeAutoObservable(this);

    if (window.location.pathname === '/') {
      this.router.navigate('/boards');
    }
  }
}

export const appModel = new AppModel();
