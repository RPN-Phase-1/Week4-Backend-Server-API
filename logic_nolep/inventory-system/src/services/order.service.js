const prisma = require("../../prisma/client");

const getOrders = async () => {
  return await prisma.order.findMany();
};

const getOrder = async (orderId) => {
  return await prisma.order.findUnique({
    where: { id: orderId },
  });
};

const createOrder = async ({ totalPrice, customerName, customerEmail, userId }) => {
  return await prisma.order.create({
    data: { totalPrice, customerName, customerEmail, userId },
  });
};

const updateOrder = async (orderId, { totalPrice, customerName, customerEmail, userId }) => {
  return await prisma.order.update({
    where: { id: orderId },
    data: { totalPrice, customerName, customerEmail, userId },
  });
};

const deleteOrder = async (orderId) => {
  await prisma.orderItem.deleteMany({ where: { orderId } });
  return await prisma.order.delete({
    where: { id: orderId },
  });
};

const getOrdersByUserId = async (userId) => {
  return await prisma.order.findMany({
    where: { userId },
  });
};

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersByUserId,
};
