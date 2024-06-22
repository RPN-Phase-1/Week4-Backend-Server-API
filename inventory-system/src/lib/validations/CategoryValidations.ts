import Joi from 'joi';
import CustomValidations from './CustomValidations';

export default class CategoryValidations {
  public static create = {
    body: Joi.object().keys({
      name: Joi.string().required(),
    }),
  };

  public static get = {
    params: Joi.object().keys({
      categoryId: Joi.string().required().custom(CustomValidations.uuid),
    }),
  };

  public static update = {
    params: Joi.object().keys({
      categoryId: Joi.string().required().custom(CustomValidations.uuid),
    }),
    body: Joi.object()
      .keys({
        name: Joi.string().required(),
      })
      .min(1),
  };

  public static delete = {
    params: Joi.object().keys({
      categoryId: Joi.string().required().custom(CustomValidations.uuid),
    }),
  };
}
