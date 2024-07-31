export default class ApiError extends Error {
  public constructor(public statusCode: number, message: string, public isOperational = true, stack = '') {
    super(message);
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
