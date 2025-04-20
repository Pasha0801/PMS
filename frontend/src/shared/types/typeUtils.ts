export type Nullable<T> = T extends object
  ? { [K in keyof T]: T[K] | null }
  : T;
