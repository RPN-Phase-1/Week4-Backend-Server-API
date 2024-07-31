const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().positive().required(),
    quantityInStock: Joi.number().integer().min(0).required(),
    categoryId: Joi.string().custom(objectId).required(),
    userId: Joi.string().custom(objectId).required(),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId).required(),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      price: Joi.number().positive(),
      quantityInStock: Joi.number().integer().min(0),
      categoryId: Joi.string().custom(objectId),
      userId: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
