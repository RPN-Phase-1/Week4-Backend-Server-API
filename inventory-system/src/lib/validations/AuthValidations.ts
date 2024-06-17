import Joi from 'joi';
import CustomValidations from './CustomValidations';

export default class AuthValidation {
  public static register = {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().custom(CustomValidations.password),
    }),
  };

  public static login = {
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required().custom(CustomValidations.password),
    }),
  };

  public static logout = {
    body: Joi.object().keys({
      email: Joi.string().required(),
    }),
  };
}
