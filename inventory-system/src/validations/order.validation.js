const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createOrder = {
  body: Joi.object().keys({
    date: Joi.date().required(),
    totalPrice: Joi.number().positive().required(),
    customerName: Joi.string().required(),
    customerEmail: Joi.string().email().required(),
    userId: Joi.string().custom(objectId).required(),
    orderItems: Joi.array().items(
      Joi.object().keys({
        productId: Joi.string().custom(objectId).required(),
        quantity: Joi.number().integer().positive().required(),
        price: Joi.number().positive().required(),
      })
    ),
  }),
};

const getOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId).required(),
  }),
};

const updateOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      date: Joi.date(),
      totalPrice: Joi.number().positive(),
      customerName: Joi.string(),
      customerEmail: Joi.string().email(),
      userId: Joi.string().custom(objectId),
      orderItems: Joi.array().items(
        Joi.object().keys({
          productId: Joi.string().custom(objectId),
          quantity: Joi.number().integer().positive(),
          price: Joi.number().positive(),
        })
      ),
    })
    .min(1),
};

const deleteOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
};
