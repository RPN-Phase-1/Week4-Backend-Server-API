import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import RouterBuilder from '../../../lib/models/RouterBuilder';
import { AddMiddleware } from '../../../lib/utils/RouterDecorator';
import AuntheticationMiddleware from '../../../lib/middlewares/AuthenticationMiddleware';
import CategoryService from '../../../services/category';
import ValidationMiddleware from '../../../lib/middlewares/ValidationMiddleware';
import CategoryValidations from '../../../lib/validations/CategoryValidations';

@AddMiddleware(ValidationMiddleware.validate(CategoryValidations.create))
@AddMiddleware(AuntheticationMiddleware.auth())
export default class extends RouterBuilder {
  public static override async controller(req: Request, res: Response) {
    const data = await CategoryService.create(req.body);
    const code = httpStatus.CREATED;
    res.status(code).json({
      code,
      message: 'Category Created!',
      data,
    });
  }
}
