import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import RouterBuilder from '../../../lib/models/RouterBuilder';
import { AddMiddleware } from '../../../lib/utils/RouterDecorator';
import AuntheticationMiddleware from '../../../lib/middlewares/AuthenticationMiddleware';
import OrderService from '../../../services/order';
import ValidationMiddleware from '../../../lib/middlewares/ValidationMiddleware';
import OrderValidations from '../../../lib/validations/OrderValidations';

@AddMiddleware(ValidationMiddleware.validate(OrderValidations.create))
@AddMiddleware(AuntheticationMiddleware.auth())
export default class extends RouterBuilder {
  public static override async controller(req: Request, res: Response) {
    const data = await OrderService.create(req.body);
    const code = httpStatus.CREATED;
    res.status(code).json({
      code,
      message: 'Order Created!',
      data,
    });
  }
}
