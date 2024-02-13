const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createOrder = {
  body: Joi.object().keys({
    customerName: Joi.string().required(),
    customerEmail: Joi.string().email().required(),
    userId: Joi.string().required().custom(objectId),
  }),
};

const getAllOrders = {
  query: Joi.object().keys({
    page: Joi.number().required().min(1),
    size: Joi.number().required().min(1),
  }),
};

const getOrderById = {
  params: Joi.object().keys({
    orderId: Joi.string().required().custom(objectId),
  }),
};

const updateOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      customerName: Joi.string(),
      customerEmail: Joi.string().email(),
      userId: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().required().custom(objectId),
  }),
};

const getOrderItemByOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrderItemByOrder,
};
