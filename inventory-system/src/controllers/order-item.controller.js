const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { orderItemService } = require('../services');

const createOrderItem = catchAsync (async (req, res) => {
  const orderItem = await orderItemService.createOrderItem(req.body)

  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: "Create Order Item Success",
    data: orderItem
  });
});

const getOrderItems = catchAsync (async (req, res) => {
  const orderItem = await orderItemService.getOrderItems()

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Get Order Items Success",
    data: orderItem
  });
});

const getOrderItemById = catchAsync (async (req, res) => {
  const orderItem = await orderItemService.getOrderItemById(req.params.orderItemId)

  if(!orderItem) throw new ApiError(httpStatus.NOT_FOUND, "Order Item NOt Found ")

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Get Order Item By Id Success",
    data: orderItem
  });
});

const updateOrderItemById = catchAsync (async (req, res) => {
  const orderItem = await orderItemService.updateOrderItemById(req.params.orderItemId, req.body)

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Update Order Item By Id Success",
    data: orderItem
  });
});

const deleteOrderItemById = catchAsync (async (req, res) => {
  const orderItem = await orderItemService.deleteOrderItemById(req.params.orderItemId)

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Delete Order Item By Id Success",
    data: orderItem
  });
})

module.exports = {
  createOrderItem, 
  getOrderItems,
  getOrderItemById,
  updateOrderItemById,
  deleteOrderItemById
}