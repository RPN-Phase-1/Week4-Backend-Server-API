import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import RouterBuilder from '../../../../lib/models/RouterBuilder';
import { AddMiddleware, UseParam } from '../../../../lib/utils/RouterDecorator';
import AuntheticationMiddleware from '../../../../lib/middlewares/AuthenticationMiddleware';
import CategoryService from '../../../../services/category';
import ValidationMiddleware from '../../../../lib/middlewares/ValidationMiddleware';
import CategoryValidations from '../../../../lib/validations/CategoryValidations';

@UseParam
@AddMiddleware(ValidationMiddleware.validate(CategoryValidations.update))
@AddMiddleware(AuntheticationMiddleware.auth())
export default class extends RouterBuilder {
  public static override async controller(req: Request<{ categoryId: string }>, res: Response) {
    const data = await CategoryService.update(req.params.categoryId, req.body);
    const code = httpStatus.OK;
    res.status(code).json({
      code,
      message: 'Category Updated',
      data,
    });
  }
}
