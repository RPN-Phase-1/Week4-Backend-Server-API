const httpStatus = require('http-status');
const { orderService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const getAll = catchAsync(async (req, res) => {
  const { id, page, size } = req.query;

  const filter = {
    contains: id,
  };

  const options = {
    skip: page,
    take: size,
  };

  const order = await orderService.getOrders(options, filter);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get All Order Success',
    data: order,
  });
});

const getOrder = catchAsync(async (req, res) => {
  const order = await orderService.getOrderById(req.params.orderId);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get Order Success',
    data: order,
  });
});

const update = catchAsync(async (req, res) => {
  const order = await orderService.updateOrder(req.params.orderId, req.body);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Update Order Success',
    data: order,
  });
});

const remove = catchAsync(async (req, res) => {
  const order = await orderService.deleteOrder(req.params.orderId);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Delete Order Success',
    data: null,
  });
});

const create = catchAsync(async (req, res) => {
  const order = await orderService.createOrder(req.body);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Create Order Success',
    data: order,
  });
});

module.exports = {
  getAll,
  getOrder,
  create,
  update,
  remove,
};
