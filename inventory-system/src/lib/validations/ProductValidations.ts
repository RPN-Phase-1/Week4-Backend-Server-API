import Joi from 'joi';
import CustomValidations from './CustomValidations';

export default class ProductValidations {
  public static create = {
    body: Joi.object().keys({
      name: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string().required(),
      quantityInStock: Joi.number().required(),
      userId: Joi.string().required().custom(CustomValidations.uuid),
      categoryId: Joi.string().required().custom(CustomValidations.uuid),
    }),
  };

  public static get = {
    params: Joi.object().keys({
      productId: Joi.string().required().custom(CustomValidations.uuid),
    }),
  };

  public static update = {
    params: Joi.object().keys({
      productId: Joi.string().required().custom(CustomValidations.uuid),
    }),
    body: Joi.object()
      .keys({
        name: Joi.string(),
        price: Joi.number(),
        description: Joi.string(),
        quantityInStock: Joi.number(),
        userId: Joi.string().custom(CustomValidations.uuid),
        categoryId: Joi.string().custom(CustomValidations.uuid),
      })
      .min(1),
  };

  public static delete = {
    params: Joi.object().keys({
      productId: Joi.string().required().custom(CustomValidations.uuid),
    }),
  };

  public static search = {
    query: Joi.object().keys({
      category: Joi.string().required(),
    }),
  };
}
