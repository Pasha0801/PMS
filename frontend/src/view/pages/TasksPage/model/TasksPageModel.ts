import { makeAutoObservable } from 'mobx';

import { tasksController } from '#controller/TasksController';
import { Task } from '#shared/types';
import { ApiError } from '#shared/utils';
import { appModel } from '#view/app';
import {
  TaskDialog,
  TaskDialogModelProps,
  ToolbarOnChange,
} from '#view/features';

import { DEFAULT_TOOLBAR } from './constants';

export class TasksPageModel {
  private readonly appModel = appModel;
  private readonly tasksController = tasksController;

  private tasksFull: Task[] = [];
  public isLoading: boolean = true;
  public isError: boolean = false;

  private toolbar: ToolbarOnChange = DEFAULT_TOOLBAR;

  constructor() {
    makeAutoObservable(this);

    this.getTasks();
  }

  /** Получение всех tasks */
  public getTasks = async () => {
    const res = await this.tasksController.getTasks();
    if (res instanceof ApiError) {
      this.isError = true;
    } else {
      this.tasksFull = res;
    }
    this.isLoading = false;
  };

  /** Срабатывает при изменении поиска или фильтров */
  public onChangeToolbar = (value: ToolbarOnChange) => {
    this.toolbar = value;
  };

  /** Computed фильтрованный список задач */
  public get tasks() {
    const search = this.toolbar.search.toLowerCase().replace(' ', '');
    const status = this.toolbar.filter.status;
    const board = this.toolbar.filter.board;

    const filteredTasks = this.tasksFull.filter((task) => {
      const title = task.title;
      const description = task.description;
      const assignee = task.assignee.fullName;

      const searchable = title
        .concat(description, assignee)
        .toLowerCase()
        .replace(' ', '');

      const searchResult = searchable.includes(search);
      const filterStatusResult =
        status === null ? true : task.status === status;
      const filterBoardResult =
        board === null ? true : task.boardId === board.id;

      return searchResult && filterStatusResult && filterBoardResult;
    });

    return filteredTasks;
  }

  /** Вызываем модальное окно для создания */
  public createNewTask = () => {
    const taskDialogProps: TaskDialogModelProps = {
      board: null,
      disableFieldBoard: false,
      onSuccess: () => this.getTasks(),
      showButtonToBoard: false,
      task: null,
      type: 'create',
    };
    this.appModel.dialog.open(TaskDialog(taskDialogProps));
  };

  /** Навигация в случае ошибки загрузки данных*/
  public navigateBoardsPage = () => {
    appModel.router.navigate('/boards');
  };
}
