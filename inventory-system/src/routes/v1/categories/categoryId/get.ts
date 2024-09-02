import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import RouterBuilder from '../../../../lib/models/RouterBuilder';
import { AddMiddleware, UseParam } from '../../../../lib/utils/RouterDecorator';
import AuntheticationMiddleware from '../../../../lib/middlewares/AuthenticationMiddleware';
import CategoryService from '../../../../services/category';
import ValidationMiddleware from '../../../../lib/middlewares/ValidationMiddleware';
import CategoryValidations from '../../../../lib/validations/CategoryValidations';

@UseParam
@AddMiddleware(ValidationMiddleware.validate(CategoryValidations.get))
@AddMiddleware(AuntheticationMiddleware.auth())
export default class extends RouterBuilder {
  public static override async controller(req: Request<{ categoryId: string }>, res: Response) {
    const data = await CategoryService.get(req.params.categoryId);
    const code = httpStatus.OK;
    res.status(code).json({
      code,
      message: 'Category retrieved!',
      data,
    });
  }
}
