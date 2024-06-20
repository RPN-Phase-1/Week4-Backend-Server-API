import Joi from 'joi';
import CustomValidations from './CustomValidations';

export default class AuthValidation {
  public static register = {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().custom(CustomValidations.password),
      name: Joi.string().required(),
      role: Joi.string().custom(CustomValidations.role),
    }),
  };

  public static login = {
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  };

  public static logout = {
    body: Joi.object().keys({
      email: Joi.string().required(),
    }),
  };
}
