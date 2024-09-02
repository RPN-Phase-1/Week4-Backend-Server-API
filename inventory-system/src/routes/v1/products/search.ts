import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import RouterBuilder from '../../../lib/models/RouterBuilder';
import { AddMiddleware, DeclareMethod } from '../../../lib/utils/RouterDecorator';
import AuntheticationMiddleware from '../../../lib/middlewares/AuthenticationMiddleware';
import ValidationMiddleware from '../../../lib/middlewares/ValidationMiddleware';
import ProductValidations from '../../../lib/validations/ProductValidations';
import ProductService from '../../../services/product';

@DeclareMethod('get')
@AddMiddleware(ValidationMiddleware.validate(ProductValidations.search))
@AddMiddleware(AuntheticationMiddleware.auth())
export default class extends RouterBuilder {
  public static override async controller(req: Request, res: Response) {
    const data = await ProductService.searchByCategory(req.query.category as string);
    const code = httpStatus.OK;
    res.status(code).json({
      code,
      message: 'Product Retrieved!',
      data,
    });
  }
}
