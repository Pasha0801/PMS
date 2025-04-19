import { User, Priority, Status, Task, Board } from '#shared/types';

export type TaskDialogModelProps = {
  type: 'create' | 'edit';
  task: Task | null;
  board: Board | null;
  disableFieldBoard: boolean;
  showButtonToBoard: boolean;
};

export type TaskDialogControls = {
  title: string;
  buttonSubmit: {
    text: string;
    onClick: VoidFunction | null;
    isDisabled: boolean;
    isLoading: boolean;
    isError: boolean;
    errorText: string;
  };
  buttonToBoard: {
    text: string;
    onClick: VoidFunction | null;
    show: boolean;
  };
};

export type TaskDialogForm = {
  title: {
    label: string,
    value: string | null;
    isError: boolean;
    errorText: string;
  };
  description: {
    label: string,
    value: string | null;
    isError: boolean;
    errorText: string;
  };
  board: {
    label: string,
    value: Board | null;
    options: Board[];
    isDisabled: boolean;
    isLoading: boolean;
    isError: boolean;
    errorText: string;
  };
  priority: {
    label: string,
    value: Priority | null;
    options: Priority[];
    isError: boolean;
    errorText: string;
  };
  status: {
    label: string,
    value: Status | null;
    options: Status[];
    isError: boolean;
    errorText: string;
  };
  assignee: {
    label: string,
    value: User | null;
    options: User[];
    isLoading: boolean;
    isError: boolean;
    errorText: string;
  };
};

export type TaskDialogField = keyof TaskDialogForm
