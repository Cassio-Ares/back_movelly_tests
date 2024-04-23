export class UnauthorizedError extends Error {
  readonly message: string;
  readonly statusCode: number;
  readonly error: string;

  constructor(message: string) {
    super();
    this.message = message;
    this.statusCode = 401;
    this.error = "Unauthorized";
  }
}
