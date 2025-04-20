import { makeAutoObservable } from 'mobx';

import { appModel } from '#view/app';
import { TaskDialog, TaskDialogModelProps } from '#view/features/TaskDialog';

export class HeaderModel {
  private readonly appModel = appModel;

  constructor() {
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
  /** Вызов создания задачи из кнопки подтвердить */
  public createNewTask = () => {
    const taskDialogProps: TaskDialogModelProps = {
      board: null,
      disableFieldBoard: false,
      // TODO отправлять функцию на обновление в зависимости от места где вызвана, обновлять задачи или доски
      onSuccess: () => {},
      showButtonToBoard: false,
      task: null,
      type: 'create',
    };
    appModel.dialog.open(TaskDialog(taskDialogProps));
  };
}
