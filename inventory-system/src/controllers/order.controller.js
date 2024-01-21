const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { orderService } = require('../services');

const createOrder = catchAsync(async (req, res) => {
  const order = await orderService.createOrder(req.body);

  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: 'Create Order Success',
    data: order,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const filter = { total: req.query.total };
  const options = {
    take: req.query.take || 10,
    page: req.query.page || 1,
    sort: req.query.sort === 'latest' ? { date: 'desc' } : { date: 'asc' },
  };

  const orders = await orderService.queryOrders(filter, options);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get Orders Success',
    data: orders,
  });
});

module.exports = {
  createOrder,
  getAllOrders,
};
