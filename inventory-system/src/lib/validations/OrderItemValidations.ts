import Joi from 'joi';
import CustomValidations from './CustomValidations';

export default class OrderItemValidations {
  public static create = {
    body: Joi.object().keys({
      quantity: Joi.number().required(),
      unitPrice: Joi.number().required(),
      orderId: Joi.string().required().custom(CustomValidations.objectId),
      productId: Joi.string().required().custom(CustomValidations.objectId),
    }),
  };

  public static get = {
    params: Joi.object().keys({
      orderItemId: Joi.string().required().custom(CustomValidations.objectId),
    }),
  };

  public static update = {
    params: Joi.object().keys({
      orderItemId: Joi.string().required().custom(CustomValidations.objectId),
    }),
    body: Joi.object()
      .keys({
        quantity: Joi.number().required(),
        unitPrice: Joi.number().required(),
        orderId: Joi.string().required().custom(CustomValidations.objectId),
        productId: Joi.string().required().custom(CustomValidations.objectId),
      })
      .min(1),
  };

  public static delete = {
    params: Joi.object().keys({
      orderItemId: Joi.string().required().custom(CustomValidations.objectId),
    }),
  };
}
