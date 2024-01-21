const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { orderItemService } = require('../services');

const createOrderItem = catchAsync(async (req, res) => {
  const orderItem = await orderItemService.createOrderItem(req.body);

  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: 'Create OrderItem Success',
    data: orderItem,
  });
});

const getAllOrderItems = catchAsync(async (req, res) => {
  const filter = { quantity: req.query.quantity };
  const options = {
    take: req.query.take || 10,
    page: req.query.page || 1,
    sort: req.query.sort === 'latest' ? { updatedAt: 'desc' } : { updatedAt: 'asc' },
  };

  const orderItems = await orderItemService.queryOrderItems(filter, options);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get OrderItems Success',
    data: orderItems,
  });
});

const getOrderItem = catchAsync(async (req, res) => {
  const order = await orderItemService.getOrderItemById(req.params.orderItemId);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get Order Success',
    data: order,
  });
});
module.exports = {
  createOrderItem,
  getAllOrderItems,
  getOrderItem,
};
