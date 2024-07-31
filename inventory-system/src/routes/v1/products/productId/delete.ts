import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import RouterBuilder from '../../../../lib/models/RouterBuilder';
import { AddMiddleware, UseParam } from '../../../../lib/utils/RouterDecorator';
import AuntheticationMiddleware from '../../../../lib/middlewares/AuthenticationMiddleware';
import ProductService from '../../../../services/product';
import ValidationMiddleware from '../../../../lib/middlewares/ValidationMiddleware';
import ProductValidations from '../../../../lib/validations/ProductValidations';

@UseParam
@AddMiddleware(ValidationMiddleware.validate(ProductValidations.delete))
@AddMiddleware(AuntheticationMiddleware.auth())
export default class extends RouterBuilder {
  public static override async controller(req: Request<{ productId: string }>, res: Response) {
    const data = await ProductService.delete(req.params.productId);
    const code = httpStatus.OK;
    res.status(code).json({
      code,
      message: 'Product Deleted!',
      data,
    });
  }
}
