import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import RouterBuilder from '../../../lib/models/RouterBuilder';
import { AddMiddleware } from '../../../lib/utils/RouterDecorator';
import AuntheticationMiddleware from '../../../lib/middlewares/AuthenticationMiddleware';
import OrderItemService from '../../../services/orderItem';
import ValidationMiddleware from '../../../lib/middlewares/ValidationMiddleware';
import OrderItemValidations from '../../../lib/validations/OrderItemValidations';

@AddMiddleware(ValidationMiddleware.validate(OrderItemValidations.create))
@AddMiddleware(AuntheticationMiddleware.auth())
export default class extends RouterBuilder {
  public static override async controller(req: Request, res: Response) {
    const data = await OrderItemService.create(req.body);
    const code = httpStatus.OK;
    res.status(code).json({
      code,
      message: 'OrderItems Created',
      data,
    });
  }
}
