const orderService = require("../services/order.service");
const { orderValidationSchema } = require("../validations/order.validation");
const handleResponse = require("../utils/responseHandler");

const getOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrders();
    handleResponse(res, 200, "Success get Orders!", orders);
  } catch (err) {
    handleResponse(res, 500, "Failed to get Orders!", null, err.message);
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await orderService.getOrder(req.params.id);
    handleResponse(res, 200, "Success get Order!", order);
  } catch (err) {
    handleResponse(res, 500, "Failed to get Order!", null, err.message);
  }
};

const createOrder = async (req, res) => {
  try {
    const { totalPrice, customerName, customerEmail, userId } = req.body;
    const { error } = orderValidationSchema.validate(req.body);

    if (error) {
      return handleResponse(res, 400, "Validation Error", null, error.details[0].message);
    }

    const createdOrder = await orderService.createOrder({
      totalPrice,
      customerName,
      customerEmail,
      userId,
    });

    handleResponse(res, 200, "Success create Order!", createdOrder);
  } catch (err) {
    handleResponse(res, 500, "Failed to create Order!", null, err.message);
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { totalPrice, customerName, customerEmail, userId } = req.body;
    const { error } = orderValidationSchema.validate(req.body);
    const existingOrder = await orderService.getOrder(orderId);

    if (!existingOrder) {
      return handleResponse(res, 404, "Order not found.");
    }

    if (error) {
      return handleResponse(res, 400, "Validation Error", null, error.details[0].message);
    }

    const updatedOrder = await orderService.updateOrder(orderId, {
      totalPrice,
      customerName,
      customerEmail,
      userId,
    });
    
    handleResponse(res, 200, "Success update Order!", updatedOrder);
  } catch (err) {
    handleResponse(res, 500, "Failed to update Order!", null, err.message);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await orderService.deleteOrder(req.params.id);
    handleResponse(res, 200, "Success delete Order!", deletedOrder);
  } catch (err) {
    handleResponse(res, 500, "Failed to delete Order!", null, err.message);
  }
};

module.exports = { getOrders, getOrder, createOrder, updateOrder, deleteOrder };
