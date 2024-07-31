import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

export default class RouterBuilder {
  public static middlewares: (typeof this.controller)[];

  public static useParam = false;

  public static declareMethod?: 'get' | 'post' | 'put' | 'delete';

  public static nextParam?: string;

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  public static async controller(_request: Request, _response: Response, _next: NextFunction): Promise<unknown> {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'this must be overrided');
  }

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  public static async authentication(_request: Request, _response: Response, _next: NextFunction) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'this must be overrided');
  }
}
