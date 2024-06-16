import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

export default class RouterBuilder {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  public static async controller(_request: Request, _response: Response, _next: NextFunction) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'this must be overrided');
  }
}
