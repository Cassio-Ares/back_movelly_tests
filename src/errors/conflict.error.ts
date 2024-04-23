export class ConflictError extends Error {
  readonly message: string;
  readonly statusCode: number;
  readonly error: string;


  constructor(message: string) {
    super();
    this.message = message;
    this.statusCode = 409;
    this.error = "Conflict"
  }
}
