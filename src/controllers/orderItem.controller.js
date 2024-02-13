/* eslint-disable no-multi-assign */
const httpStatus = require("http-status");
const { orderItemService, productService, orderService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

const createOrderItem = catchAsync(async (req, res) => {
  const { quantity, orderId, productId } = req.body;
  const product = await productService.getProductById(productId);

  if (product.quantityInStock < quantity) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Insufficient product stock");
  }

  // update quantityInStock in product
  const newQuantityInStock = product.quantityInStock - quantity;
  await productService.updateProduct(product.id, { quantityInStock: newQuantityInStock });

  // update totalPrice in Order
  const order = await orderService.getOrderById(orderId);
  const newTotalPrice = order.totalPrice + quantity * product.price;
  await orderService.updateOrder(orderId, { totalPrice: newTotalPrice });

  const orderItem = await orderItemService.createOrderItem({ ...req.body, unitPrice: quantity * product.price });

  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: "Successfully create order item",
    data: orderItem,
  });
});

const getAllOrderItem = catchAsync(async (req, res) => {
  const { page, size } = req.query;
  const skip = page * size - size;
  const allOrderItems = await orderItemService.getAllOrderItem(skip, Number(size));

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
  const { orderItemId } = req.params;
  const { productId, quantity } = req.body;

  const orderItem = await orderItemService.getOrderItemById(orderItemId);
  const order = await orderService.getOrderById(orderItem.orderId);
  const oldProduct = await productService.getProductById(orderItem.productId);

  let newUnitPrice;
  let newTotalPrice;

  if (productId) {
    const restoreQuantityInStock = oldProduct.quantityInStock + orderItem.quantity;
    await productService.updateProduct(orderItem.productId, { ...oldProduct, quantityInStock: restoreQuantityInStock });

    const newProduct = await productService.getProductById(productId);

    if (newProduct.quantityInStock < (quantity || orderItem.quantity)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Insufficient product stock");
    }

    newUnitPrice = newProduct.price * (quantity || orderItem.quantity);
    const newQuantityInStock = newProduct.quantityInStock - (quantity || orderItem.quantity);
    await productService.updateProduct(productId, { ...newProduct, quantityInStock: newQuantityInStock });

    newTotalPrice = order.totalPrice - orderItem.unitPrice + newUnitPrice;
  } else if (quantity && !productId) {
    if (oldProduct.quantityInStock < quantity) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Insufficient product stock");
    }

    const newQuantityInStock = oldProduct.quantityInStock + orderItem.quantity - quantity;
    await productService.updateProduct(oldProduct.id, { quantityInStock: newQuantityInStock });

    newUnitPrice = oldProduct.price * quantity;
    newTotalPrice = order.totalPrice - orderItem.unitPrice + newUnitPrice;
  }

  await orderService.updateOrder(order.id, { totalPrice: newTotalPrice });

  const orderItemUpdated = await orderItemService.updateOrderItem(orderItemId, {
    ...req.body,
    unitPrice: newUnitPrice,
  });

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
