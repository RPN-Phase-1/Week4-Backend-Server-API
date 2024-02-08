const httpStatus = require("http-status");
const { orderService, userService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const createOrder = catchAsync(async (req, res) => {
  const order = await orderService.createOrder(req.body);

  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: "Successfully create order",
    data: order,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const { page, size } = req.query;
  const skip = page * size - size;
  const orders = await orderService.getAllOrders(skip, parseInt(size));

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Successfully get all order",
    data: orders,
  });
});

const getOrderById = catchAsync(async (req, res) => {
  const order = await orderService.getOrderById(req.params.orderId);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Successfully get order",
    data: order,
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const orderUpdated = await orderService.updateOrder(req.params.orderId, req.body);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Successfully update order",
    data: orderUpdated,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const order = await orderService.deleteOrder(req.params.orderId);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Successfully delete order",
    data: order,
  });
});

const getOrderItemByOrder = catchAsync(async (req, res) => {
  const orderItems = await orderService.getOrderItemByOrder(req.params.orderId);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Successfully get order items",
    data: orderItems,
  });
});

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrderItemByOrder,
};
