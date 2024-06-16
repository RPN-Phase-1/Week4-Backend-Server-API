import passport from 'passport';
import httpStatus from 'http-status';
import type { Response, Request, NextFunction } from 'express';
import ApiError from '../utils/ApiError';

export default class AuntheticationMiddleware {
  public static verifyCallback(req: { user: unknown }, _resolve: unknown, reject: (error: ApiError) => unknown) {
    return function (err: Error, user: unknown, info: unknown) {
      if (err || info || !user) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
      }
      req.user = user;
    };
  }

  public static auth() {
    const { verifyCallback } = this;
    return async function (_req: Request, _res: Response, next: NextFunction) {
      try {
        await passport.authenticate('jwt', { session: false }, verifyCallback);
        return next();
      } catch (error) {
        return next(error);
      }
    };
  }
}
