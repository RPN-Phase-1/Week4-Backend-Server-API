const httpStatus = require("http-status");
const prisma = require("../../prisma/client");
const ApiError = require("../utils/ApiError");

/**
 * Create a orderItem
 * @param {Object} orderItemBody
 * @returns {Promise<OrderItem>}
 */
const createOrderItem = async (orderItemBody) => {
  const orderItem = await prisma.orderItem.create({
    data: orderItemBody,
  });
  return orderItem;
};

/**
 * Query for orders
 * @returns {Promise<QueryResult>}
 */
const queryOrderItems = async (filter, options) => {
  const orderItems = await prisma.orderItem.findMany();
  return orderItems;
};

/**
 * Get orderItem by id
 * @param {ObjectId} id
 * @returns {Promise<OrderItem>}
 */
const getOrderItemById = async (id) => {
  const orderItem = await prisma.orderItem.findUnique({
    where: {
      id: id,
    },
  });
  return orderItem
};

/**
 * Update orderItem by id
 * @param {ObjectId} orderItemId
 * @param {Object} updateBody
 * @returns {Promise<OrderItem>}
 */
const updateOrderItemById = async (orderItemId, updateBody) => {
  const orderItem = await getOrderItemById(orderItemId);
  if (!orderItem) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order item not found");
  }
  const updateOrderItem = await prisma.orderItem.update({
    where: {
      id: orderItemId,
    },
    data: updateBody,
  });

  return updateOrderItem;
};

/**
 * Delete category by id
 * @param {ObjectId} orderItemId
 * @returns {Promise<OrderItem>}
 */
const deleteOrderItemById = async (orderItemId) => {
  const orderItem = await getOrderItemById(orderItemId);
  if (!orderItem) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order item not foudn");
  }

  const deleteOrderItem = await prisma.orderItem.delete({
    where: {
        id: orderItemId
    }
  })

  return deleteOrderItem
};

module.exports = {createOrderItem, queryOrderItems, getOrderItemById, updateOrderItemById, deleteOrderItemById}
