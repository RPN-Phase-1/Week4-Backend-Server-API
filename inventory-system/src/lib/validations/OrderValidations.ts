import Joi from 'joi';
import CustomValidations from './CustomValidations';

export default class OrderValidations {
  public static create = {
    body: Joi.object().keys({
      date: Joi.date().required(),
      totalPrice: Joi.number().required(),
      customerName: Joi.string().required(),
      customerEmail: Joi.string().required(),
      userId: Joi.string().required().custom(CustomValidations.objectId),
    }),
  };

  public static get = {
    params: Joi.object().keys({
      orderId: Joi.string().required().custom(CustomValidations.objectId),
    }),
  };

  public static update = {
    params: Joi.object().keys({
      orderId: Joi.string().required().custom(CustomValidations.objectId),
    }),
    body: Joi.object()
      .keys({
        date: Joi.date().required(),
        totalPrice: Joi.number().required(),
        customerName: Joi.string().required(),
        customerEmail: Joi.string().required(),
        userId: Joi.string().required().custom(CustomValidations.objectId),
      })
      .min(1),
  };

  public static delete = {
    params: Joi.object().keys({
      orderId: Joi.string().required().custom(CustomValidations.objectId),
    }),
  };
}
