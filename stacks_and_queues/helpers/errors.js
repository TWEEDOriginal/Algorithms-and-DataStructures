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

export class FullStackException extends Error {
  constructor(message) {
    super(message);
    this.name = "FullStackException";
  }
}

export class InvalidStackException extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidStackException";
  }
}
