const Joi = require('joi');
const objectId = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};

module.exports = {
  createUser,
};
