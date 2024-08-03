// Utils ini buat instance response API ERROR
// Jadi nnti bisa pake -> error = new ApiError(statusCode,message, false, err.stack)
// param statusCode = httpStatus nya apa... 404 kah? 500? atau yg lainnya, atau pakai module httpstatus.NOT_FOUND dan yglainnnya
// param message nya penjelasan errornya kenapa.. misal 'User not found' , 'Internal server error' dll

class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
