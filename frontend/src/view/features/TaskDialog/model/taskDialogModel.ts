import { makeAutoObservable } from 'mobx';

import { appController } from '#controller/AppController';
import { boardsController } from '#controller/BoardsController';
import { tasksController } from '#controller/TasksController';
import { usersController } from '#controller/UsersController';
import { Board, Nullable, Status, Task } from '#shared/types';
import { ApiError, StorageError } from '#shared/utils';
import { appModel } from '#view/app/model';

import { DEFAULT_CONTROLS, DEFAULT_FORM } from './constants';
import {
  TaskDialogControls,
  TaskDialogField,
  TaskDialogForm,
  TaskDialogModelProps,
} from './types';

export class TaskDialogModel {
  private readonly appModel = appModel;
  private readonly appController = appController;
  private readonly tasksController = tasksController;
  private readonly boardsController = boardsController;
  private readonly usersController = usersController;

  public props: TaskDialogModelProps;
  public form: TaskDialogForm = DEFAULT_FORM;
  public controls: TaskDialogControls = DEFAULT_CONTROLS;

  constructor(props: TaskDialogModelProps) {
    makeAutoObservable(this);

    this.props = props;

    this.initDialogData();
  }

  // Публичные методы

  /** Закрытие диалога */
  public close = () => {
    this.appModel.dialog.close();
  };

  /** Изменение любого поля формы, вызов валидации */
  public change = <T extends TaskDialogField>(
    field: T,
    value: TaskDialogForm[T]['value'],
  ) => {
    this.form[field].value = value;
    this.validate();

    this.appController.storageSetCreateTaskData(this.task[1]);
  };

  // Приватные методы

  /** Вызов создания задачи из кнопки подтвердить */
  private submitCreate = async () => {
    const [isValid, task] = this.task;

    if (!isValid) {
      this.controls.buttonSubmit.isError = true;
      this.controls.buttonSubmit.errorText = 'Поля заполнены неверно';
      return;
    }

    this.controls.buttonSubmit.isLoading = true;

    const res = await this.tasksController.createTask(task);

    if (res instanceof ApiError) {
      this.controls.buttonSubmit.isError = true;
      this.controls.buttonSubmit.errorText = 'Произошла ошибка';
    } else {
      this.controls.buttonSubmit.isError = false;
      this.controls.buttonSubmit.errorText = '';
      this.close();
      this.appController.storageClearCreateTaskData();
      this.props.onSuccess();
    }

    this.controls.buttonSubmit.isLoading = false;
  };

  /** Вызов обновления задачи из кнопки подтвердить */
  private submitUpdate = async () => {
    const [isValid, task] = this.task;

    if (!isValid) {
      this.controls.buttonSubmit.isError = true;
      this.controls.buttonSubmit.errorText = 'Поля заполнены неверно';
      return;
    }

    this.controls.buttonSubmit.isLoading = true;

    const res = await this.tasksController.updateTask(task);

    if (res instanceof ApiError) {
      this.controls.buttonSubmit.isError = true;
      this.controls.buttonSubmit.errorText = 'Произошла ошибка';
    } else {
      this.controls.buttonSubmit.isError = false;
      this.controls.buttonSubmit.errorText = '';
      this.close();
      this.props.onSuccess();
    }

    this.controls.buttonSubmit.isLoading = false;
  };

  /** Возвращает Task из полей формы. Null если поля некорректны*/
  private get task(): [true, Task] | [false, Nullable<Task>] {
    const title = this.form.title.value;
    const description = this.form.description.value;
    const assignee = this.form.assignee.value;
    const board = this.form.board.value;
    const priority = this.form.priority.value;
    const status = this.form.status.value;

    if (!title || !description || !assignee || !board || !priority || !status) {
      return [
        false,
        {
          id: this.props.task?.id ?? -1,
          title,
          description,
          assignee,
          boardId: board?.id ?? null,
          boardName: board?.name ?? null,
          priority,
          status,
        },
      ];
    }

    return [
      true,
      {
        id: this.props.task?.id ?? -1,
        title,
        description,
        assignee,
        boardId: board.id,
        boardName: board.name,
        priority,
        status,
      },
    ];
  }

  /** Валидация всех полей формы */
  private validate = () => {
    let formHasErrors = false;

    const fields = Object.keys(this.form) as TaskDialogField[];
    fields.forEach((field) => {
      const value = this.form[field].value;

      if (value === null) {
        this.form[field].isError = true;
        this.form[field].errorText = 'Поле не может быть пустым';
        formHasErrors = true;
      } else {
        this.form[field].isError = false;
        this.form[field].errorText = '';
      }
    });

    this.controls.buttonSubmit.isDisabled = formHasErrors;
  };

  /** Установка значений формы из пропсов */
  private initDialogData = () => {
    const { type, board, disableFieldBoard, showButtonToBoard } = this.props;
    const isEdit = type === 'edit';

    const getTask = (): [boolean, Nullable<Task> | null] => {
      if (isEdit) {
        return [false, this.props.task];
      }

      const storageTask = this.appController.storageGetCreateTaskData();

      if (storageTask instanceof StorageError) {
        return [false, this.props.task];
      }

      return [true, storageTask];
    };

    const [fromLocalStorage, task] = getTask();

    this.initFieldAssignee(task);
    this.initFieldBoard(task, board, disableFieldBoard);
    this.initTitle(isEdit);
    this.initButtonSubmit(isEdit);
    this.initButtonToBoard(showButtonToBoard, board, task);
    this.initFieldTitle(task);
    this.initFieldDescription(task);
    this.initFieldStatus(isEdit, task);
    this.initFieldPriority(task);

    if (fromLocalStorage) {
      this.validate();
    }
  };

  /** Установка значения заголовка диалога */
  private initTitle = (isEdit: boolean) => {
    this.controls.title = isEdit ? 'Редактирование задачи' : 'Создание задачи';
  };

  /** Установка значения кнопки Подтвердить */
  private initButtonSubmit = (isEdit: boolean) => {
    this.controls.buttonSubmit.text = isEdit ? 'Обновить' : 'Создать';
    this.controls.buttonSubmit.onClick = isEdit
      ? this.submitUpdate
      : this.submitCreate;
  };

  /** Установка значения кнопки На доску */
  private initButtonToBoard = (
    showButtonToBoard: boolean,
    board: Board | null,
    task: Nullable<Task> | null,
  ) => {
    if (!showButtonToBoard || (!board && !task)) {
      return;
    }

    this.controls.buttonToBoard.show = true;
    this.controls.buttonToBoard.onClick = () => {
      this.close();
      this.appModel.router.navigate(
        `/board/${String(board?.id ?? task?.boardId)}`,
      );
    };
  };

  /** Установка значения поля Название */
  private initFieldTitle = (task: Nullable<Task> | null) => {
    if (task) {
      this.form.title.value = task.title;
    }
  };

  /** Установка значения поля Описание */
  private initFieldDescription = (task: Nullable<Task> | null) => {
    if (task) {
      this.form.description.value = task.description;
    }
  };

  /** Установка значения поля Статус */
  private initFieldStatus = (isEdit: boolean, task: Nullable<Task> | null) => {
    const statusOptions = this.tasksController.statuses;
    this.form.status.options = statusOptions;

    if (isEdit) {
      this.form.status.value = task?.status ?? Status.Backlog;
    } else {
      this.form.status.value = Status.Backlog;
      this.form.status.isDisabled = true;
    }
  };

  /** Установка значения поля Приоритет */
  private initFieldPriority = (task: Nullable<Task> | null) => {
    const priorityOptions = this.tasksController.priorities;
    this.form.priority.options = priorityOptions;

    if (task) {
      this.form.priority.value = task.priority;
    }
  };

  /** Установка значения поля Исполнитель. С запросом данных */
  private initFieldAssignee = async (task: Nullable<Task> | null) => {
    this.form.assignee.isLoading = true;

    const assigneeOptions = await this.usersController.getUsers();

    if (assigneeOptions instanceof ApiError) {
      this.form.assignee.isError = true;
      this.form.assignee.errorText = 'Ошибка при загрузке данных';
    } else {
      this.form.assignee.options = assigneeOptions;
    }

    if (task) {
      this.form.assignee.value = task.assignee;
    }

    if (this.form.assignee.value !== null) {
      this.form.assignee.isError = false;
      this.form.assignee.errorText = '';
    }

    this.form.assignee.isLoading = false;
  };

  /** Установка значения поля Доска. С запросом данных */
  private initFieldBoard = async (
    task: Nullable<Task> | null,
    board: Board | null,
    disableFieldBoard: boolean,
  ) => {
    if (disableFieldBoard) {
      this.form.board.isDisabled = true;
    }

    this.form.board.isLoading = true;

    const boardOptions = await this.boardsController.getBoards();
    if (boardOptions instanceof ApiError) {
      this.form.board.isError = true;
      this.form.board.errorText = 'Ошибка при загрузке данных';
    } else {
      this.form.board.options = boardOptions;
    }

    if (board) {
      this.form.board.value = board;
    } else if (task) {
      this.form.board.value = {
        description: '',
        id: task?.boardId ?? -1,
        name: task?.boardName ?? '',
        taskCount: -1,
      };
    }

    if (this.form.board.value !== null) {
      this.form.board.isError = false;
      this.form.board.errorText = '';
    }

    this.form.board.isLoading = false;
  };
}
