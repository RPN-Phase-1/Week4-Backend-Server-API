const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    quantityInStock: Joi.number().required(),
    categoryId: Joi.string().custom(objectId),
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProduct,
};
