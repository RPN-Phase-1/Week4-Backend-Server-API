const httpStatus = require("http-status");
const prisma = require("../../prisma");
const ApiError = require("../utils/ApiError");
const { orderService, productService } = require("./index");

const createOrderItem = async (dataOrderItem) => {
  await orderService.getOrderById(dataOrderItem.orderId);
  await productService.getProductById(dataOrderItem.productId);

  return prisma.orderItem.create({
    data: dataOrderItem,
  });
};

const getAllOrderItem = async (skip, take) => {
  return prisma.orderItem.findMany({
    skip,
    take,
  });
};

const getOrderItemById = async (orderItemId) => {
  const orderItem = await prisma.orderItem.findUnique({
    where: {
      id: orderItemId,
    },
  });

  if (!orderItem) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order Item not found");
  }

  return orderItem;
};

const updateOrderItem = async (orderItemId, dataOrderItem) => {
  await getOrderItemById(orderItemId);

  if (dataOrderItem.orderId) await orderService.getOrderById(dataOrderItem.orderId);
  if (dataOrderItem.productId) await productService.getProductById(dataOrderItem.productId);

  return prisma.orderItem.update({
    where: {
      id: orderItemId,
    },
    data: dataOrderItem,
  });
};

const deleteOrderItem = async (orderItemId) => {
  await getOrderItemById(orderItemId);

  return prisma.orderItem.delete({
    where: {
      id: orderItemId,
    },
  });
};

module.exports = {
  createOrderItem,
  getAllOrderItem,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
};
