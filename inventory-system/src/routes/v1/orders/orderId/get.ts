import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import RouterBuilder from '../../../../lib/models/RouterBuilder';
import { AddMiddleware, UseParam } from '../../../../lib/utils/RouterDecorator';
import AuntheticationMiddleware from '../../../../lib/middlewares/AuthenticationMiddleware';
import ValidationMiddleware from '../../../../lib/middlewares/ValidationMiddleware';
import OrderValidations from '../../../../lib/validations/OrderValidations';
import OrderService from '../../../../services/order';

@UseParam
@AddMiddleware(ValidationMiddleware.validate(OrderValidations.get))
@AddMiddleware(AuntheticationMiddleware.auth())
export default class extends RouterBuilder {
  public static override async controller(req: Request<{ orderId: string }>, res: Response) {
    const data = await OrderService.get(req.params.orderId);
    const code = httpStatus.OK;
    res.status(code).json({
      code,
      message: 'Order retrieved!',
      data,
    });
  }
}
