const httpStatus = require('http-status');
const prisma = require('../../prisma');
const ApiError = require('../utils/ApiError');
const order = require('../services/order.service')
const product = require('../services/product.service')

const createOrderItem = async (orderItemBody) => {
  // Get data orderId and productId
  const order = await prisma.order.findUnique({
    where: {
      id: orderItemBody.orderId,
    },
  });

  const product = await prisma.product.findUnique({
    where: {
      id: orderItemBody.productId,
    },
  });

  // Validation error
  if (!order) throw new ApiError(httpStatus.NOT_FOUND, 'Order ID not found');
  if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product ID not found');
  if (orderItemBody.quantity > product.quantityInStock)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Order quantity exceed product stock. Current product stock is ${product.quantityInStock}`
    );

  // Update quantity product and Total price in order
  await prisma.product.update({
    where: {
      id: product.id,
    },
    data: { quantityInStock: product.quantityInStock - orderItemBody.quantity },
  });

  await prisma.order.update({
    where: { id: order.id },
    data: { totalPrice: orderItemBody.quantity * orderItemBody.unitPrice },
  });

  // Create orderItem
  return prisma.orderItem.create({
    data: orderItemBody,
  });
};

const queryOrderItems = async (filter, options) => {
  const { take, skip } = !options;

  const orderItems = await prisma.orderItem.findMany({
    take: take && parseInt(take),
    skip: skip && parseInt(skip),
  });
  return orderItems;
};

const getOrderItemById = async (id) => {
  return prisma.orderItem.findFirst({
    where: {
      id,
    },
  });
};

const updateOrderItemById = async (orderItemId, updateBody, products, orders) => {

  //  const orderItem = await prisma.orderItem.findUnique({
  //   where:{ id: orderItemId}
  //  });
  
  //  const orderId = await order.getOrderById(orders)
  //  const productId = await product.getProductById(products)

  //  if(!orderId) throw new ApiError(httpStatus.NOT_FOUND, 'OrderId Not found')
  //  if(!productId) throw new ApiError(httpStatus.NOT_FOUND, 'ProductId Not found')
  //  if(!orderItem) throw new ApiError(httpStatus.NOT_FOUND, 'OrderItemId not found')

   return prisma.orderItem.update({
    where:{
      id: orderItemId
    },
    data: updateBody
   })

  };

const deleteOrderItemById = async (orderItemId) => {
  const orderItem = await getOrderItemById(orderItemId);
  if (!orderItem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'OrderItem not found');
  }

  const deleteOrderItems = await prisma.orderItem.deleteMany({
    where: {
      id: orderItemId,
    },
  });

  return deleteOrderItems;
};

module.exports = {
  createOrderItem,
  queryOrderItems,
  getOrderItemById,
  updateOrderItemById,
  deleteOrderItemById,
};
