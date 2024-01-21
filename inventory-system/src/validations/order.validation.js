const Joi = require('joi');
const { objectId } = require('./category.validation');

const createOrder = {
  body: Joi.object().keys({
    date: Joi.date().required(),
    totalPrife: Joi.number().required(),
    customerName: Joi.string().required(),
    customerEmail: Joi.string().required(),
    userId: Joi.string().custom(objectId).required(),
  }),
};

const getOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};

const updateOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      date: Joi.date(),
      totalPrife: Joi.number(),
      customerName: Joi.string(),
      customerEmail: Joi.string(),
      userId: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
};
