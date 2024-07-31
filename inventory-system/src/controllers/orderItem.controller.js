const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { orderItemService } = require("../services");

const createOrderItem = catchAsync(async (req, res) => {
  const orderItem = await orderItemService.createOrderItem(req.body);

  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: "Create Order Item Succes",
    data: orderItem,
  });
});

const getOrderItems = catchAsync(async (req, res) => {
  const result = await orderItemService.queryOrderItems();

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Get Order Items Succes",
    data: result,
  });
});

const getOrderItem = catchAsync(async (req, res) => {
  const orderItem = await orderItemService.getOrderItemById(id);
  if (!orderItem) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order Item not found");
  }

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Create Order Item Succes",
    data: orderItem,
  });
});

const updateOrderItem = catchAsync(async (req, res) => {
  const orderItem = await orderItemService.updateOrderItemById(
    req.params.orderId,
    req.body
  );
  if (!orderItem) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order Item not found");
  }

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Update Order Item Succes",
    data: orderItem,
  });
});

const deleteOrderItem = catchAsync(async (req, res) => {
  const orderItem = await orderItemService.deleteOrderItemById(req.params.orderId);

  if (!orderItem) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order Item not found");
  }

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Delete Order Item Succes",
    data: null,
  });
});

module.exports = { createOrderItem, getOrderItem, getOrderItems, updateOrderItem, deleteOrderItem };
