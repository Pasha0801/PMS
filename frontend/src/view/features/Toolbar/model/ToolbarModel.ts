import { makeAutoObservable } from 'mobx';

import { boardsController } from '#controller/BoardsController';
import { tasksController } from '#controller/TasksController';
import { ApiError } from '#shared/utils';

import { ToolbarProps } from '../Toolbar';
import { Filter, FilterField, Search, ToolbarOnChange } from '../types';

import { DEFAULT_FILTER, DEFAULT_SEARCH } from './constants';

export class ToolbarModel {
  private readonly tasksController = tasksController;
  private readonly boardsController = boardsController;

  public search: Search = DEFAULT_SEARCH;
  public filter: Filter = DEFAULT_FILTER;

  private onChange: (value: ToolbarOnChange) => void;

  constructor(props: ToolbarProps) {
    makeAutoObservable(this);

    this.onChange = props.onChange;

    this.getStatuses();
    this.getBoards();
  }

  // Public

  /** Изменение поиска*/
  public changeSearch = (value: string) => {
    this.search.value = value;

    this.onChange({
      search: this.search.value,
      filter: {
        board: this.filter.board.value,
        status: this.filter.status.value,
      },
    });
  };

  /** Изменения фильтров */
  public changeFilter = <T extends FilterField>(
    field: FilterField,
    value: Filter[T]['value'],
  ) => {
    this.filter[field].value = value;

    this.onChange({
      search: this.search.value,
      filter: {
        board: this.filter.board.value,
        status: this.filter.status.value,
      },
    });
  };

  // Private

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
}
