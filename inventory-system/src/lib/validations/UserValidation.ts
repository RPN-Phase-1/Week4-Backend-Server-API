import Joi from 'joi';
import CustomValidations from './CustomValidations';

export default class UserValidation {
  public static create = {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required(),
      password: Joi.string().required().custom(CustomValidations.password),
      role: Joi.string().custom(CustomValidations.role),
      isEmailVerified: Joi.boolean(),
    }),
  };

  public static update = {
    params: {
      userId: Joi.string().required().custom(CustomValidations.uuid),
    },
    body: Joi.object().keys({
      email: Joi.string().email(),
      name: Joi.string(),
      password: Joi.string().custom(CustomValidations.password),
      role: Joi.string().custom(CustomValidations.role),
      isEmailVerified: Joi.boolean(),
    }),
  };

  public static delete = {
    params: {
      userId: Joi.string().required().custom(CustomValidations.uuid),
    },
  };

  public static get = {
    params: {
      userId: Joi.string().required().custom(CustomValidations.uuid),
    },
  };
}
