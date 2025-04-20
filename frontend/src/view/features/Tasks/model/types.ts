import { Board, Status } from '#shared/types';

export type Search = {
  label: string;
  value: string;
};

export type Filter = {
  status: {
    label: string;
    value: Status | null;
    options: (Status | null)[];
  };
  board: {
    label: string;
    value: Board | null;
    isLoading: boolean;
    options: (Board | null)[];
    isError: boolean;
    errorText: string;
  };
};

export type FilterField = keyof Filter;
