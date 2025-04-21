import { makeAutoObservable } from 'mobx';

import { tasksController } from '#controller/TasksController';
import { Board, Task, Status } from '#shared/types';
import { ApiError } from '#shared/utils';
import { appModel } from '#view/app';
import { TaskDialog, TaskDialogModelProps } from '#view/features';

import { BoardProps } from '../Board';

export class BoardModel {
  public tasks: Task[];
  public board: Board;
  public taskToDo: Task[] = [];
  public taskInProgress: Task[] = [];
  public taskDone: Task[] = [];

  private getBoardTasks: VoidFunction;

  constructor(props: BoardProps) {
    makeAutoObservable(this);

    this.tasks = props.tasks;
    this.board = props.board;
    this.getBoardTasks = props.getBoardTasks;
    this.filterTasks();
  }

  /** Редактирование task c предустановленными полями */
  public editTask = (task: Task) => {
    const taskDialogProps: TaskDialogModelProps = {
      board: this.board,
      disableFieldBoard: true,
      onSuccess: () => this.getBoardTasks(),
      showButtonToBoard: false,
      task,
      type: 'edit',
    };
    appModel.dialog.open(TaskDialog(taskDialogProps));
  };

  /** Перемещение task dnd */
  public moveTask = async (
    taskId: number,
    sourceColumn: 'taskToDo' | 'taskInProgress' | 'taskDone',
    destinationColumn: 'taskToDo' | 'taskInProgress' | 'taskDone',
    destinationIndex: number,
  ) => {
    const statusMap: {
      [key in 'taskToDo' | 'taskInProgress' | 'taskDone']: Status;
    } = {
      taskToDo: Status.Backlog,
      taskInProgress: Status.InProgress,
      taskDone: Status.Done,
    };

    const sourceTasks = [...this[sourceColumn]];
    const taskIndex = sourceTasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
      return false;
    }

    const [movedTask] = sourceTasks.splice(taskIndex, 1);
    movedTask.status = statusMap[destinationColumn];

    this[sourceColumn] = sourceTasks;

    const destinationTasks = [...this[destinationColumn]];
    const insertIndex =
      destinationIndex >= 0 ? destinationIndex : destinationTasks.length;
    destinationTasks.splice(insertIndex, 0, movedTask);
    this[destinationColumn] = destinationTasks;

    if (sourceColumn === destinationColumn) {
      return true;
    }

    const res = await tasksController.updateTaskStatus(movedTask);
    if (res instanceof ApiError) {
      this[sourceColumn] = [...sourceTasks, movedTask];
      this[destinationColumn] = destinationTasks.filter(
        (task) => task.id !== taskId,
      );
      return false;
    }

    return true;
  };

  /** Фильтрует все таски по статусу */
  private filterTasks = () => {
    this.taskToDo = this.tasks.filter(
      ({ status }) => status === Status.Backlog,
    );
    this.taskInProgress = this.tasks.filter(
      ({ status }) => status === Status.InProgress,
    );
    this.taskDone = this.tasks.filter(({ status }) => status === Status.Done);
  };
}
