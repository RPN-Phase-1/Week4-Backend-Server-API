import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import RouterBuilder from '../../../../lib/models/RouterBuilder';
import { UseParam, AddMiddleware } from '../../../../lib/utils/RouterDecorator';
import AuntheticationMiddleware from '../../../../lib/middlewares/AuthenticationMiddleware';
import UserService from '../../../../services/user';
import ValidationMiddleware from '../../../../lib/middlewares/ValidationMiddleware';
import UserValidation from '../../../../lib/validations/UserValidation';

@UseParam
@AddMiddleware(ValidationMiddleware.validate(UserValidation.delete))
@AddMiddleware(AuntheticationMiddleware.auth(true))
export default class extends RouterBuilder {
  public static override async controller(req: Request<{ userId: string }>, res: Response) {
    const data = await UserService.delete(req.params.userId);
    const code = httpStatus.OK;
    res.status(code).json({
      code,
      message: 'Succesfully delete user!',
      data,
    });
  }
}
