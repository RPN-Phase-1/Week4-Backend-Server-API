const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    quantityInStock: Joi.number().required().min(0),
    userId: Joi.string().required().custom(objectId),
    categoryId: Joi.string().required().custom(objectId),
  }),
};

const getAllProducts = {
  query: Joi.object().keys({
    page: Joi.number().required().min(1),
    size: Joi.number().required().min(1),
  }),
};

const getProductById = {
  params: Joi.object().keys({
    productId: Joi.string().required().custom(objectId),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      price: Joi.number().min(0),
      quantityInStock: Joi.number().min(0),
      userId: Joi.string().custom(objectId),
      categoryId: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
