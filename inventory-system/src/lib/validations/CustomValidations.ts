import Joi from 'joi';

export default class CustomValidations {
  public static objectId(value: string, helpers: Joi.CustomHelpers) {
    if (!value.match(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi))
      return helpers.message('"{{#label}}" must be a valid UUID' as unknown as Joi.LanguageMessages);
    return value;
  }

  public static password(value: string, helpers: Joi.CustomHelpers) {
    if (value.length < 8) {
      return helpers.message('password must be at least 8 characters' as unknown as Joi.LanguageMessages);
    }
    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
      return helpers.message('password must contain at least 1 letter and 1 number' as unknown as Joi.LanguageMessages);
    }
    return value;
  }
}