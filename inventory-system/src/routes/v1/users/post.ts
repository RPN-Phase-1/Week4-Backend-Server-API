import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import RouterBuilder from '../../../lib/models/RouterBuilder';
import { AddMiddleware } from '../../../lib/utils/RouterDecorator';
import AuntheticationMiddleware from '../../../lib/middlewares/AuthenticationMiddleware';
import UserService from '../../../services/user';
import ValidationMiddleware from '../../../lib/middlewares/ValidationMiddleware';
import UserValidation from '../../../lib/validations/UserValidation';
import ApiError from '../../../lib/utils/ApiError';

@AddMiddleware(ValidationMiddleware.validate(UserValidation.create))
@AddMiddleware(AuntheticationMiddleware.auth(true))
export default class extends RouterBuilder {
  public static override async controller(req: Request, res: Response) {
    const existing = await UserService.getEmail(req.body.email);
    if (existing) throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken!');
    const data = await UserService.create(req.body);
    const code = httpStatus.CREATED;
    res.status(code).json({
      code,
      message: 'User succesfully created',
      data,
    });
  }
}
