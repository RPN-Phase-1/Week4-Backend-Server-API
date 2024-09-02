import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import RouterBuilder from '../../../../lib/models/RouterBuilder';
import TokenService from '../../../../services/generateToken';
import AuthService from '../../../../services/auth';
import { AddMiddleware } from '../../../../lib/utils/RouterDecorator';
import AuthValidation from '../../../../lib/validations/AuthValidations';
import ValidationMiddleware from '../../../../lib/middlewares/ValidationMiddleware';

@AddMiddleware(ValidationMiddleware.validate(AuthValidation.login))
export default class extends RouterBuilder {
  public static override async controller(req: Request, res: Response) {
    const user = await AuthService.login(req.body.email, req.body.password);
    const tokens = await TokenService.generateAuth(user);
    const code = httpStatus.OK;
    res.status(code).json({
      code,
      message: 'User Login!',
      data: {
        user,
        tokens,
      },
    });
  }
}
