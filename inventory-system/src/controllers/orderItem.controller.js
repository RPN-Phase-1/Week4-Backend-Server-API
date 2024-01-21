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

module.exports = {
  createOrderItem,
};
