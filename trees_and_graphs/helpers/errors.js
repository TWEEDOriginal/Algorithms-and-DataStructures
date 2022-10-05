export class InvalidBuildError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidBuildError";
  }
}
