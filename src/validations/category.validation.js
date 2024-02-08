const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const getAllCategories = {
  query: Joi.object().keys({
    page: Joi.number().required(),
    size: Joi.number().required(),
  }),
};

const getCategoryById = {
  params: Joi.object().keys({
    categoryId: Joi.string().required().custom(objectId),
  }),
};

const updateCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const deleteCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().required().custom(objectId),
  }),
};

const getProductByCategory = {
  query: Joi.object().keys({
    categoryName: Joi.string().required(),
  }),
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getProductByCategory,
};
