const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { orderService } = require('../services');

const createOrder = catchAsync (async (req, res) => {
  const order = await orderService.createOrder(req.body);

  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: "Create Order Success",
    data: order
  });
});

const getOrders = catchAsync (async (req, res) => {
  const order = await orderService.getOrders();

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Get Orders Success",
    data: order
  });
});

const getOrderById = catchAsync (async (req, res) => {
  const order = await orderService.getOrderById(req.params.orderId);

  if(!order) throw new ApiError(httpStatus.NOT_FOUND, 'Order Not Found');

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Get Order By Id Success",
    data: order
  });
});

const updateOrderById = catchAsync (async (req, res) => {
  const order = await orderService.updateOrderById(req.params.orderId, req.body);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Update Order By Id Success",
    data: order
  });
});

const deleteOrderById = catchAsync (async (req, res) => {
  const order = await orderService.deleteOrderById(req.params.orderId);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Delete Order By Id Success",
    data: order
  });
});

const getOrderItemByOrder = catchAsync (async (req, res) => {
  const getOrderItem = await orderService.getOrderItemByOrder(req.params.orderId)

  if(!getOrderItem) throw new ApiError(httpStatus.NOT_FOUND, "Order Not Found")

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Get Order Item By Order Success",
    data: getOrderItem
  });
});

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  getOrderItemByOrder
}