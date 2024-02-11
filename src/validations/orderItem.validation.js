const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createOrderItem = {
  body: Joi.object().keys({
    orderId: Joi.string().required().custom(objectId),
    productId: Joi.string().required().custom(objectId),
    quantity: Joi.number().required().min(1),
  }),
};

const getAllOrderItems = {
  query: Joi.object().keys({
    page: Joi.number().required().min(1),
    size: Joi.number().required().min(0),
  }),
};

const getOrderItemById = {
  params: Joi.object().keys({
    orderItemId: Joi.string().required().custom(objectId),
  }),
};

const updateOrderItem = {
  params: Joi.object().keys({
    orderItemId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      orderId: Joi.string().custom(objectId),
      productId: Joi.string().custom(objectId),
      quantity: Joi.number().min(1),
    })
    .min(1),
};

const deleteOrderItem = {
  params: Joi.object().keys({
    orderItemId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createOrderItem,
  getAllOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
};
