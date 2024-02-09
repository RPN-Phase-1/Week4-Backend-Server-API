const httpStatus = require("http-status");
const prisma = require("../../prisma");
const ApiError = require("../utils/ApiError");
const userService = require("./user.service");

const createOrder = async (dataOrder) => {
  return prisma.order.create({
    data: dataOrder,
  });
};

const getAllOrders = async (skip, take) => {
  return prisma.order.findMany({
    skip,
    take,
  });
};

const getOrderById = async (orderId) => {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  }

  return order;
};

const updateOrder = async (orderId, dataOrder) => {
  await getOrderById(orderId);
  if (dataOrder.userId) await userService.getUserById(dataOrder.userId);

  return prisma.order.update({
    where: {
      id: orderId,
    },
    data: dataOrder,
  });
};

const deleteOrder = async (orderId) => {
  await getOrderById(orderId);

  return prisma.order.delete({
    where: {
      id: orderId,
    },
  });
};

const getOrderItemByOrder = async (orderId) => {
  await getOrderById(orderId);

  return prisma.orderItem.findMany({
    where: {
      orderId,
    },
  });
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrderItemByOrder,
};
