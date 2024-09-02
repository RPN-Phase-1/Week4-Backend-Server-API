import type { Request, Response } from 'express';
import httpStatus, { UNAUTHORIZED } from 'http-status';
import RouterBuilder from '../../../../lib/models/RouterBuilder';
import { UseParam, AddMiddleware } from '../../../../lib/utils/RouterDecorator';
import AuntheticationMiddleware from '../../../../lib/middlewares/AuthenticationMiddleware';
import UserService from '../../../../services/user';
import ValidationMiddleware from '../../../../lib/middlewares/ValidationMiddleware';
import UserValidation from '../../../../lib/validations/UserValidation';
import ApiError from '../../../../lib/utils/ApiError';

@UseParam
@AddMiddleware(ValidationMiddleware.validate(UserValidation.update))
@AddMiddleware(AuntheticationMiddleware.auth(true))
export default class extends RouterBuilder {
  public static override async controller(req: Request<{ userId: string }>, res: Response) {
    if (req.body.email) {
      const result = await UserService.getEmail(req.body.email);
      if (result && result.id !== req.params.userId) throw new ApiError(UNAUTHORIZED, 'Email already taken');
    }
    const data = await UserService.update(req.params.userId, req.body);
    const code = httpStatus.OK;
    res.status(code).json({
      code,
      message: 'Succesfully update user!',
      data,
    });
  }
}
