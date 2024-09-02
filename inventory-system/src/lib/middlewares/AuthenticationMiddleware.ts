import passport from 'passport';
import httpStatus from 'http-status';
import type { Response, Request, NextFunction } from 'express';
import ApiError from '../utils/ApiError';
import type UserService from '../../services/user';

export default class AuntheticationMiddleware {
  public static verifyCallback(req: Request, resolve: (value?: unknown) => unknown, reject: (error: ApiError) => unknown) {
    return function (err: Error, user: unknown, info: unknown) {
      if (err || info || !user) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
      }
      req.user = user;
      resolve();
    };
  }

  public static auth(mustAdmin = false) {
    const { verifyCallback } = this;
    return async function (req: Request, res: Response, next: NextFunction) {
      try {
        await new Promise((resolve, reject) => {
          passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject))(req, res, next);
        });
        if (mustAdmin) {
          const user = req.user as Awaited<ReturnType<typeof UserService.getId>>;
          if (user.role !== 'Admin') throw new ApiError(httpStatus.UNAUTHORIZED, 'You must be admin to acces this');
        }
        next();
      } catch (error) {
        next(error);
      }
    };
  }
}
