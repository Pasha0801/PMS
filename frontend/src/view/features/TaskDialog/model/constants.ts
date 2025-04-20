import { TaskDialogControls, TaskDialogForm } from './types';

export const DEFAULT_FORM: TaskDialogForm = {
  title: {
    label: 'Название',
    value: null,
    isError: false,
    errorText: '',
  },
  description: {
    label: 'Описание',
    value: null,
    isError: false,
    errorText: '',
  },
  board: {
    label: 'Доска',
    value: null,
    options: [],
    isDisabled: false,
    isLoading: false,
    isError: false,
    errorText: '',
  },
  priority: {
    label: 'Приоритет',
    value: null,
    options: [],
    isError: false,
    errorText: '',
  },
  status: {
    label: 'Статус',
    value: null,
    options: [],
    isDisabled: false,
    isError: false,
    errorText: '',
  },
  assignee: {
    label: 'Исполнитель',
    value: null,
    options: [],
    isLoading: false,
    isError: false,
    errorText: '',
  },
};

export const DEFAULT_CONTROLS: TaskDialogControls = {
  title: '',
  buttonSubmit: {
    text: '',
    onClick: null,
    isDisabled: true,
    isLoading: false,
    isError: false,
    errorText: '',
  },
  buttonToBoard: {
    text: 'Перейти на доску',
    onClick: null,
    show: false,
  },
};
