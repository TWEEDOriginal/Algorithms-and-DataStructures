export class EmptyStackException extends Error {
  constructor(message) {
    super(message);
    this.name = "EmptyStackException";
  }
}

export class EmptyQueueException extends Error {
  constructor(message) {
    super(message);
    this.name = "EmptyQueueException";
  }
}
