import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import RouterBuilder from '../../../../lib/models/RouterBuilder';
import { UseParam, AddMiddleware } from '../../../../lib/utils/RouterDecorator';
import AuntheticationMiddleware from '../../../../lib/middlewares/AuthenticationMiddleware';
import UserService from '../../../../services/user';

@UseParam
@AddMiddleware(AuntheticationMiddleware.auth())
export default class extends RouterBuilder {
  public static override async controller(req: Request<{ userId: string }>, res: Response) {
    const data = await UserService.getId(req.params.userId);
    const code = httpStatus.OK;
    res.status(code).json({
      code,
      message: 'User succesfully retrieved!',
      data,
    });
  }
}