import passport from 'passport';
import httpStatus from 'http-status';
import type { Response, Request, NextFunction } from 'express';
import ApiError from '../utils/ApiError';

export default class AuntheticationMiddleware {
  public static verifyCallback(req: Request, _resolve: unknown, reject: (error: ApiError) => unknown) {
    return function (err: Error, user: unknown, info: unknown) {
      if (err || info || !user) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
      }
      req.user = user;
    };
  }

  public static auth() {
    const { verifyCallback } = this;
    return async function (req: Request, res: Response, next: NextFunction) {
      return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject))(req, res, next);
      })
        .then(() => next())
        .catch((err) => next(err));
    };
  }
}
