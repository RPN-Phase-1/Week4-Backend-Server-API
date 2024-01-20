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

const getProductById = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    categoryId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
    })
    .min(1),
};

module.exports = {
  createProduct,
  updateProduct,
  getProductById,
};
