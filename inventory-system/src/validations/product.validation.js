const Joi = require('joi');
const { objectId } = require('./custom.validation');

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().precision(2).positive().required(),
    quantityInStock: Joi.number().required(),
    categoryId: Joi.string().custom(objectId).required(),
    userId: Joi.string().custom(objectId).required(),
  }),
};

const getAll = {
  query: Joi.object().keys({
    page: Joi.number().integer().min(0),
    size: Joi.number().integer().min(1),
    id: Joi.string().custom(objectId),
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number().precision(2).positive(),
    quantityInStock: Joi.number(),
    categoryId: Joi.string().custom(objectId),
    userId: Joi.string().custom(objectId),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    orderBy: Joi.string().valid(
      'name:asc',
      'name:desc',
      'description:asc',
      'description:desc',
      'price:asc',
      'price:desc',
      'quantityInStock:asc',
      'quantityInStock:desc',
      'categoryId:asc',
      'categoryId:desc'
    ),
  }),
};

module.exports = { create, getAll };
