import { makeAutoObservable } from 'mobx';
import { ReactNode } from 'react';

class DialogModel {
  private _component: ReactNode | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get Component() {
    return this._component;
  }

  public open = (dialog: ReactNode | null) => {
    return (this._component = dialog);
  };

  public close = () => {
    return (this._component = null);
  };
}

export const dialogModel = new DialogModel();
