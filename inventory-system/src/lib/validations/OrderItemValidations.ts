import Joi from 'joi';
import CustomValidations from './CustomValidations';

export default class OrderItemValidations {
  public static create = {
    body: Joi.object().keys({
      quantity: Joi.number().required(),
      unitPrice: Joi.number().required(),
      orderId: Joi.string().required().custom(CustomValidations.uuid),
      productId: Joi.string().required().custom(CustomValidations.uuid),
    }),
  };

  public static get = {
    params: Joi.object().keys({
      orderItemId: Joi.string().required().custom(CustomValidations.uuid),
    }),
  };

  public static update = {
    params: Joi.object().keys({
      orderItemId: Joi.string().required().custom(CustomValidations.uuid),
    }),
    body: Joi.object()
      .keys({
        quantity: Joi.number(),
        unitPrice: Joi.number(),
        orderId: Joi.string().custom(CustomValidations.uuid),
        productId: Joi.string().custom(CustomValidations.uuid),
      })
      .min(1),
  };

  public static delete = {
    params: Joi.object().keys({
      orderItemId: Joi.string().required().custom(CustomValidations.uuid),
    }),
  };
}
