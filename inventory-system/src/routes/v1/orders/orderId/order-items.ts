import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import RouterBuilder from '../../../../lib/models/RouterBuilder';
import { AddMiddleware, DeclareMethod, UseParam } from '../../../../lib/utils/RouterDecorator';
import AuntheticationMiddleware from '../../../../lib/middlewares/AuthenticationMiddleware';
import ValidationMiddleware from '../../../../lib/middlewares/ValidationMiddleware';
import OrderValidations from '../../../../lib/validations/OrderValidations';
import OrderService from '../../../../services/order';

@UseParam
@DeclareMethod('get')
@AddMiddleware(ValidationMiddleware.validate(OrderValidations.get))
@AddMiddleware(AuntheticationMiddleware.auth())
export default class extends RouterBuilder {
  public static override async controller(req: Request<{ orderId: string }>, res: Response) {
    const data = await OrderService.getOrderItems(req.params.orderId);
    const code = httpStatus.OK;
    res.status(code).json({
      code,
      message: 'Order Items retrieved!',
      data,
    });
  }
}
