import { makeAutoObservable } from 'mobx';

import { appModel } from '#view/app/model';

export type TaskDialogModelProps = {
  text: string;
};

export class TaskDialogModel {
  public readonly appModel = appModel;

  private _title: string;

  constructor({ text }: TaskDialogModelProps) {
    makeAutoObservable(this);

    this._title = text;
  }

  public close = () => {
    this.appModel.dialog.close();
  };

  get title() {
    return this._title;
  }
}
