export class InvalidBuildError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidBuildError";
  }
}

export class NoCommonAncestorError extends Error {
  constructor(message) {
    super(message);
    this.name = "NoCommonAncestorError";
  }
}