import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import RouterBuilder from '../../../lib/models/RouterBuilder';
import { AddMiddleware } from '../../../lib/utils/RouterDecorator';
import AuntheticationMiddleware from '../../../lib/middlewares/AuthenticationMiddleware';
import ProductService from '../../../services/product';
import ValidationMiddleware from '../../../lib/middlewares/ValidationMiddleware';
import ProductValidations from '../../../lib/validations/ProductValidations';

@AddMiddleware(ValidationMiddleware.validate(ProductValidations.create))
@AddMiddleware(AuntheticationMiddleware.auth())
export default class extends RouterBuilder {
  public static override async controller(req: Request, res: Response) {
    const data = await ProductService.create(req.body);
    const code = httpStatus.CREATED;
    res.status(code).json({
      code,
      message: 'Product created!',
      data,
    });
  }
}
