const httpStatus = require('http-status');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/apiError');

const create = async (orderItemBody) => {
  const product = await prisma.product.findFirst({
    where: {
      id: orderItemBody.productId,
    },
  });
  if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'productId not found');

  const order = await prisma.orders.findFirst({
    where: {
      id: orderItemBody.orderId,
    },
  });
  if (!order) throw new ApiError(httpStatus.NOT_FOUND, 'orderId not found');

  if (orderItemBody.quantity > product.quantityInStock) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Order quantity exceeds available stock');
  }
  orderItemBody.unitPrice = product.price;

  // Update totalPrice in Orders and quantityInStock in Product
  const orderTotalPrice = orderItemBody.quantity * product.price;
  const productQuantityStock = product.quantityInStock - orderItemBody.quantity
  const ordersUpdate = await prisma.orders.update({
    where: {
      id: orderItemBody.orderId,
    },
    data: {
      totalPrice: orderTotalPrice,
    },
  });
  const productUpdate = await prisma.product.update({
    where: {
      id: orderItemBody.productId
    }, 
    data: {
      quantityInStock: productQuantityStock
    }
  })

  return prisma.orderItem.create({
    data: orderItemBody,
  });
};

const getAll = async (filter, options, sorting) => {
  return prisma.orderItem.findMany({
    ...options,
    where: filter,
    orderBy: sorting,
  });
};

const getId = async (id) => {
  return prisma.orderItem.findFirst({
    where: {
      id: id,
    },
  });
};

const update = async (id, update) => {
  const orderItem = await getId(id);
  if (!orderItem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order Item not found');
  }

  const updateOrderItem = await prisma.orderItem.update({
    where: {
      id: id,
    },
    data: update,
  });

  return updateOrderItem;
};

const deleted = async (id) => {
  const orderItem = await getId(id);
  if (!orderItem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order Item not found');
  }

  const deleteOrderItem = await prisma.orderItem.delete({
    where: {
      id: id,
    },
  });

  return deleteOrderItem;
};

module.exports = { create, getAll, getId, update, deleted };
