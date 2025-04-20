import { makeAutoObservable } from 'mobx';

import { boardsController } from '#controller/BoardsController';
import { tasksController } from '#controller/TasksController';
import { Task } from '#shared/types';
import { ApiError } from '#shared/utils';
import { appModel } from '#view/app';
import { TaskDialog, TaskDialogModelProps } from '#view/features/TaskDialog';

import { DEFAULT_SEARCH, DEFAULT_FILTER } from './constants';
import { Search, Filter, FilterField } from './types';

export class TasksModel {
  private readonly tasksController = tasksController;
  private readonly boardsController = boardsController;

  private tasksFull: Task[] = [];

  public isLoading: boolean = true;
  public isError: boolean = false;
  public tasks: Task[] = [];
  public search: Search = DEFAULT_SEARCH;
  public filter: Filter = DEFAULT_FILTER;

  constructor() {
    makeAutoObservable(this);

    this.getTasks();
    this.getStatuses();
    this.getBoards();
  }

  public changeSearch = (value: string) => {
    this.search.value = value;
    this.filterTasks();
  };

  public changeFilter = <T extends FilterField>(
    field: FilterField,
    value: Filter[T]['value'],
  ) => {
    this.filter[field].value = value;
    this.filterTasks();
  };

  private filterTasks = () => {
    const search = this.search.value.toLowerCase().replace(' ', '');
    const status = this.filter.status.value;
    const board = this.filter.board.value;

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

    this.tasks = filteredTasks;
  };

  /** Получение всех status */
  private getStatuses = () => {
    this.filter.status.options = [null, ...this.tasksController.statuses];
  };

  /** Получение всех board */
  private getBoards = async () => {
    const res = await this.boardsController.getBoards();
    if (res instanceof ApiError) {
      this.filter.board.isError = true;
      this.filter.board.errorText = 'Произошла ошибка';
    } else {
      this.filter.board.options = [null, ...res];
    }
    this.filter.board.isLoading = false;
  };

  /** Получение всех tasks */
  private getTasks = async () => {
    const res = await this.tasksController.getTasks();
    if (res instanceof ApiError) {
      this.isError = true;
    } else {
      this.tasksFull = res;
      this.filterTasks();
    }
    this.isLoading = false;
  };

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
      disableFieldBoard: false,
      onSuccess: () => this.getTasks(),
      showButtonToBoard: false,
      task,
      type: 'edit',
    };
    appModel.dialog.open(TaskDialog(taskDialogProps));
  };
}
