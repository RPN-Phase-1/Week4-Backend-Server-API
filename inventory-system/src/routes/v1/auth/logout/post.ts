import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import RouterBuilder from '../../../../lib/models/RouterBuilder';
import UserService from '../../../../services/user';
import { AddMiddleware } from '../../../../lib/utils/RouterDecorator';
import ValidationMiddleware from '../../../../lib/middlewares/ValidationMiddleware';
import AuthValidation from '../../../../lib/validations/AuthValidations';

@AddMiddleware(ValidationMiddleware.validate(AuthValidation.logout))
export default class extends RouterBuilder {
  public static override async controller(req: Request, res: Response) {
    await UserService.deleteTokens(req.body.email);
    const code = httpStatus.OK;
    res.status(code).json({
      code,
      message: 'User Logout',
      data: {},
    });
  }
}
