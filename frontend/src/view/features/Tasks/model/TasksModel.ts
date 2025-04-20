import { makeAutoObservable } from 'mobx';

import { Task } from '#shared/types';
import { appModel } from '#view/app';
import { TaskDialog, TaskDialogModelProps } from '#view/features/TaskDialog';

import { TasksProps } from '../Tasks';

export class TasksModel {
  public tasks: Task[];
  private getTasks: VoidFunction;

  constructor(props: TasksProps) {
    makeAutoObservable(this);

    this.tasks = props.tasks;
    this.getTasks = props.getTasks;
  }

  /** вызываем модальное окно для создания */
  public createNewTask = () => {
    const taskDialogProps: TaskDialogModelProps = {
      board: null,
      disableFieldBoard: false,
      onSuccess: () => this.getTasks(),
      showButtonToBoard: false,
      task: null,
      type: 'create',
    };
    appModel.dialog.open(TaskDialog(taskDialogProps));
  };

  /** вызываем модальное окно для редактирования task*/
  public editTask = (task: Task) => {
    const taskDialogProps: TaskDialogModelProps = {
      board: null,
      disableFieldBoard: true,
      onSuccess: () => this.getTasks(),
      showButtonToBoard: true,
      task,
      type: 'edit',
    };
    appModel.dialog.open(TaskDialog(taskDialogProps));
  };
}
