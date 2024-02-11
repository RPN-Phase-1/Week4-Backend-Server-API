const Joi = require("joi");
const { objectId, password } = require("./custom.validation");

const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().custom(password),
  }),
};

const getAllUsers = {
  query: Joi.object().keys({
    page: Joi.number().required().min(1),
    size: Joi.number().required().min(0),
  }),
};

const getUserById = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().custom(password),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
};

const getOrderByUser = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
};

const getProductByUser = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  getOrderByUser,
  getProductByUser,
};
