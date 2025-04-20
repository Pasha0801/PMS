import { Filter, Search } from '../types';

export const DEFAULT_SEARCH: Search = {
  label: 'Поиск',
  value: '',
};

export const DEFAULT_FILTER: Filter = {
  status: {
    label: 'Статус',
    value: null,
    options: [],
  },
  board: {
    label: 'Доска',
    value: null,
    options: [],
    isLoading: true,
    errorText: '',
    isError: false,
  },
};
