export class ApiError {
  public text: string;

  constructor(text: string) {
    this.text = text;
  }
}

export class StorageError {
  public text: string;

  constructor(text: string) {
    this.text = text;
  }
}
