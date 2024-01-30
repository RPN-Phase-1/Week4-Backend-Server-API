class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    // Menurunkan message dari constructor error
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Jika stack !== '' atau null 
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
