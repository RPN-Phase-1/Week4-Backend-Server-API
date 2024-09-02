import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import RouterBuilder from '../../../lib/models/RouterBuilder';
import { AddMiddleware } from '../../../lib/utils/RouterDecorator';
import AuntheticationMiddleware from '../../../lib/middlewares/AuthenticationMiddleware';
import ProductService from '../../../services/product';
import ValidationMiddleware from '../../../lib/middlewares/ValidationMiddleware';
import CustomValidations from '../../../lib/validations/CustomValidations';

@AddMiddleware(ValidationMiddleware.validate(CustomValidations.getAll))
@AddMiddleware(AuntheticationMiddleware.auth())
export default class extends RouterBuilder {
  public static override async controller(req: Request, res: Response) {
    const data = await ProductService.getAll(req.query as unknown as { pageIndex: number; pageSize: number });
    const code = httpStatus.OK;
    res.status(code).json({
      code,
      message: 'Products retrieved!',
      data,
    });
  }
}
