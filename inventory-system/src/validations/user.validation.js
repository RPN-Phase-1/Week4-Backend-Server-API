const Joi = require('joi');
const { password } = require('./custom.validation');
const { objectId } = require('./custom.validation');

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    role: Joi.string().required(),
  }),
};

const getAll = {
  query: Joi.object().keys({
    page: Joi.number().integer().min(0),
    size: Joi.number().integer().min(1),
    name: Joi.string(),
    role: Joi.string(),
    orderBy: Joi.string().valid('name:asc', 'name:desc', 'role:asc', 'role:desc'),
  }),
};

const getId = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const update = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      role: Joi.string(),
    })
    .min(1),
};

const deleted = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = { create, getAll, getId, update, deleted };
