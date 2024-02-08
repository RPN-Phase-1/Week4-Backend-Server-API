const httpStatus = require("http-status");
const { orderItemService, productService, orderService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

const createOrderItem = catchAsync(async (req, res) => {
  let { quantity, unitPrice, orderId, productId } = req.body;
  const product = await productService.getProductById(productId);

  if (product.quantityInStock < quantity) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Insufficient product stock");
  }

  // update quantityInStock in product
  const newQuantityInStock = (product.quantityInStock -= quantity);
  await productService.updateProduct(product.id, { quantityInStock: newQuantityInStock });

  // count unitPrice
  unitPrice = quantity * product.price;

  // update totalPrice in Order
  const order = await orderService.getOrderById(orderId);
  const newTotalPrice = order.totalPrice + unitPrice;
  await orderService.updateOrder(orderId, { totalPrice: newTotalPrice });

  const orderItem = await orderItemService.createOrderItem({ ...req.body, unitPrice });

  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: "Successfully create order item",
    data: orderItem,
  });
});

const getAllOrderItem = catchAsync(async (req, res) => {
  const { page, size } = req.query;
  const skip = page * size - size;
  const allOrderItems = await orderItemService.getAllOrderItem(skip, parseInt(size));

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Successfully get all order item",
    data: allOrderItems,
  });
});

const getOrderItemById = catchAsync(async (req, res) => {
  const orderItem = await orderItemService.getOrderItemById(req.params.orderItemId);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Successfully get order item",
    data: orderItem,
  });
});

const updateOrderItem = catchAsync(async (req, res) => {
  const orderItemUpdated = await orderItemService.updateOrderItem(req.params.orderItemId, req.body);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Successfully update order item",
    data: orderItemUpdated,
  });
});

const deleteOrderItem = catchAsync(async (req, res) => {
  await orderItemService.deleteOrderItem(req.params.orderItemId);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Successfully delete order item",
    data: null,
  });
});

module.exports = {
  createOrderItem,
  getAllOrderItem,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
};
