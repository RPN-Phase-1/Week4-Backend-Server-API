import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import RouterBuilder from '../../../../lib/models/RouterBuilder';
import { UseParam, AddMiddleware, DeclareMethod } from '../../../../lib/utils/RouterDecorator';
import AuntheticationMiddleware from '../../../../lib/middlewares/AuthenticationMiddleware';
import UserService from '../../../../services/user';
import ValidationMiddleware from '../../../../lib/middlewares/ValidationMiddleware';
import UserValidation from '../../../../lib/validations/UserValidation';

@UseParam
@DeclareMethod('get')
@AddMiddleware(ValidationMiddleware.validate(UserValidation.get))
@AddMiddleware(AuntheticationMiddleware.auth(true))
export default class extends RouterBuilder {
  public static override async controller(req: Request<{ userId: string }>, res: Response) {
    const data = await UserService.getProducts(req.params.userId);
    const code = httpStatus.OK;
    res.status(code).json({
      code,
      message: 'Products Succesfully retrieved!',
      data,
    });
  }
}
