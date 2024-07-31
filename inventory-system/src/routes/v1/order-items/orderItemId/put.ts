import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import RouterBuilder from '../../../../lib/models/RouterBuilder';
import { AddMiddleware, UseParam } from '../../../../lib/utils/RouterDecorator';
import AuntheticationMiddleware from '../../../../lib/middlewares/AuthenticationMiddleware';
import OrderItemService from '../../../../services/orderItem';
import ValidationMiddleware from '../../../../lib/middlewares/ValidationMiddleware';
import OrderItemValidations from '../../../../lib/validations/OrderItemValidations';

@UseParam
@AddMiddleware(ValidationMiddleware.validate(OrderItemValidations.update))
@AddMiddleware(AuntheticationMiddleware.auth())
export default class extends RouterBuilder {
  public static override async controller(req: Request<{ orderItemId: string }>, res: Response) {
    const data = await OrderItemService.update(req.params.orderItemId, req.body);
    const code = httpStatus.OK;
    res.status(code).json({
      code,
      message: 'OrderItem Updated!',
      data,
    });
  }
}
