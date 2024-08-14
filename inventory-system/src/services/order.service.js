const httpStatus = require("http-status");
const prisma = require("../../prisma/client");
const ApiError = require("../utils/ApiError");
const { createOrderItem } = require("./oderItem.service");

/**
 * Create a order
 * @param {Object} orderBody
 * @returns {Promise<Order>}
 */
const createOrder = async (orderBody) => {
  const { orderItems, ...orderData } = orderBody;
  const order = await prisma.order.create({
    data: orderData,
  });

  for (const item of orderItems) {
    await createOrderItem({ ...item, orderId: order.id }, prisma);
  }

  return order;
};

/**
 * Query for orders
 * @returns {Promise<QueryResult>}
 */
const queryOrders = async (filter, options) => {
  const orders = await prisma.order.findMany();
  return orders;
};

/**
 * Get order by id
 * @param {ObjectId} id
 * @returns {Promise<Order>}
 */
const getOrderById = async (id) => {
  const order = await prisma.order.findUnique({
    where: {
      id: id,
    },
  });
};

/**
 * Update order by id
 * @param {ObjectId} orderId
 * @param {Object} updateBody
 * @returns {Promise<Order>}
 */
const updateOrderById = async (orderId, updateBody) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  }
  const updateOrder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: updateBody,
  });

  return updateOrder;
};

/**
 * Delete category by id
 * @param {ObjectId} orderId
 * @returns {Promise<Order>}
 */
const deleteOrderById = async (orderId) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not foudn");
  }

  const deleteOrder = await prisma.order.delete({
    where: {
      id: orderId,
    },
  });

  return deleteOrder;
};

module.exports = {
  createOrder,
  queryOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
};
