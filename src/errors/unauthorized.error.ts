export class UnauthorizedError extends Error {
  readonly message: string;
  readonly statusCode: number;
  readonly reason: string;

  constructor(message: string, statusCode: number, realor?: string) {
    super();
    (this.message = message),
      (this.statusCode = statusCode),
      (this.reason = realor);
  }
}
