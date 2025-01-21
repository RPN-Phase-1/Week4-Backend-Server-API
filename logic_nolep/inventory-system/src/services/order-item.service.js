const prisma = require("../../prisma/client");

const getOrderItems = async () => {
  return await prisma.orderItem.findMany();
};

const getOrderItem = async (orderItemId) => {
  return await prisma.orderItem.findUnique({
    where: { id: orderItemId },
  });
};

const createOrderItem = async ({ orderId, productId, quantity, unitPrice }) => {
  return await prisma.orderItem.create({
    data: { orderId, productId, quantity, unitPrice },
  });
};

const updateOrderItem = async (
  orderItemId,
  { orderId, productId, quantity, unitPrice }
) => {
  return await prisma.orderItem.update({
    where: { id: orderItemId },
    data: { orderId, productId, quantity, unitPrice },
  });
};

const deleteOrderItem = async (orderItemId) => {
  return await prisma.orderItem.delete({
    where: { id: orderItemId },
  });
};

module.exports = {
  getOrderItems,
  getOrderItem,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
};
