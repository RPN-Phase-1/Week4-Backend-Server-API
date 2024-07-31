import httpStatus from 'http-status';
import type { Request, Response, NextFunction } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import Config from '../../config/config';
import Logger from '../../config/logger';
import ApiError from '../utils/ApiError';

interface AxiosErr extends Error {
  response: {
    data: {
      message: string;
    };
    status: number;
  };
}

interface GlobalHttpErr extends Error {
  statusCode: keyof typeof httpStatus;
}

export default class ErrorMiddleware {
  public static errorConverter(err: Error, _req: Request, _res: Response, next: NextFunction) {
    let error = err;
    if (!(error instanceof ApiError)) {
      if ((error as AxiosErr).response) {
        const e = error as AxiosErr;
        const message = e.response.data.message || e.response.data;
        const statusCode = e.response.status;

        Logger.info('handleAxiosError');
        error = new ApiError(statusCode, message as string, false, e.stack);
      } else if (error instanceof PrismaClientKnownRequestError) {
        Logger.info('handlePrismaError');
        error = this.handlePrismaError(error);
      } else {
        const e = error as GlobalHttpErr;
        const message = e.message || httpStatus[e.statusCode];
        error = new ApiError(e.statusCode as number, message as string, false, e.stack);
      }
    }
    next(error);
  }

  private static handlePrismaError(error: PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        // handling duplicate key errors
        return new ApiError(400, `Duplicate field value: ${error.meta?.target}`, false, error.stack);
      case 'P2014':
        // handling invalid id errors
        return new ApiError(400, `Invalid ID: ${error.meta?.target}`, false, error.stack);
      case 'P2003':
        // handling invalid data errors
        return new ApiError(400, `Invalid input data: ${error.meta?.target}`, false, error.stack);
      default:
        // handling all other errors
        return new ApiError(500, `Something went wrong: ${error.message}`, false, error.stack);
    }
  }

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  public static errorHandler(error: ApiError, _req: Request, res: Response, _next: NextFunction) {
    let { statusCode, message } = error;
    if (Config.env === 'production' && !error.isOperational) {
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = httpStatus[statusCode as unknown as 500];
    }

    res.locals.errorMessage = error.message;

    const response: Record<string, unknown> = {
      code: statusCode,
      message,
    };

    if (Config.env === 'development') response.stack = error.stack;

    res.status(statusCode).send(response);
  }
}
