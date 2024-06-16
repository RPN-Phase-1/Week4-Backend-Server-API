import Joi from 'joi';
import type { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import pick from '../utils/Pick';
import ApiError from '../utils/ApiError';

export default class ValidationMiddleware {
  public static validate(schema: object) {
    return function (req: Request, _res: Response, next: NextFunction) {
      const validSchema = pick(schema, ['params', 'query', 'body'] as never[]);
      const object = pick(req, ['params', 'query', 'body']);
      const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' }, abortEarly: false })
        .validate(object);
      if (error) {
        const errorMessage = error.details.map((x) => x.message).join(', ');
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
      }
      Object.assign(req, value);
    };
  }
}
