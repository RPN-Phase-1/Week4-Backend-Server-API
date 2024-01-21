const httpStatus = require('http-status');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/ApiError');
const { orderService, productService } = require('./index');

const createOrderItem = async (data) => {
  // check if order exists and get data
  const order = await orderService.getOrderById(data.orderId);

  // check if product exists and get quantity data
  const product = await productService.getProductById(data.productId);
  // check quantity of product
  if (product.quantityInStock < data.quantity) throw new ApiError(httpStatus.BAD_REQUEST, 'Quantity not enough');

  // create order item
  const orderItem = await prisma.orderItem.create({
    data: {
      orderId: data.orderId,
      productId: data.productId,
      quantity: data.quantity,
      unitPrice: product.price,
    },
  });

  // update order total price
  await orderService.updateOrderById(order.id, {
    totalPrice: product.price * orderItem.quantity + order.totalPrice,
  });

  // update product quantity
  await productService.updateProductById(product.id, {
    quantityInStock: product.quantityInStock - orderItem.quantity,
  });

  return orderItem;
};

const getAllOrderItems = async () => {
  const orders = await prisma.orderItem.findMany();
  return orders;
};

module.exports = {
  createOrderItem,
};
