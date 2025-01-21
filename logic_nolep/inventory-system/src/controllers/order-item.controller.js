const orderItemService = require("../services/order-item.service");

const handleResponse = (res, status, message, data = null, error = null) => {
  res.status(status).json({
    status,
    message,
    data,
    error,
  });
};

const getOrderItems = async (req, res) => {
  try {
    const orderItems = await orderItemService.getOrderItems();
    handleResponse(res, 200, "Success get OrderItems!", orderItems);
  } catch (err) {
    handleResponse(res, 500, "Failed to get OrderItems!", null, err.message);
  }
};

const getOrderItem = async (req, res) => {
  try {
    const orderItem = await orderItemService.getOrderItem(req.params.id);
    handleResponse(res, 200, "Success get OrderItem!", orderItem);
  } catch (err) {
    handleResponse(res, 500, "Failed to get OrderItem!", null, err.message);
  }
};

const createOrderItem = async (req, res) => {
  try {
    const { orderId, productId, quantity, unitPrice } = req.body;

    const createdOrderItem = await orderItemService.createOrderItem({
      orderId,
      productId,
      quantity,
      unitPrice,
    });

    handleResponse(res, 200, "Success create OrderItem!", createdOrderItem);
  } catch (err) {
    handleResponse(res, 500, "Failed to create OrderItem!", null, err.message);
  }
};

const updateOrderItem = async (req, res) => {
  try {
    const orderItemId = req.params.id;
    const { orderId, productId, quantity, unitPrice } = req.body;
    
    const existingOrderItem = await orderItemService.getOrderItem(orderItemId);
    if (!existingOrderItem) {
      return handleResponse(res, 404, "OrderItem not found.");
    }

    const updatedOrderItem = await orderItemService.updateOrderItem(
      orderItemId,
      {
        orderId,
        productId,
        quantity,
        unitPrice,
      }
    );
    
    handleResponse(res, 200, "Success update OrderItem!", updatedOrderItem);
  } catch (err) {
    handleResponse(res, 500, "Failed to update OrderItem!", null, err.message);
  }
};

const deleteOrderItem = async (req, res) => {
  try {
    const deletedOrderItem = await orderItemService.deleteOrderItem(
      req.params.id
    );
    handleResponse(res, 200, "Success delete OrderItem!", deletedOrderItem);
  } catch (err) {
    handleResponse(res, 500, "Failed to delete OrderItem!", null, err.message);
  }
};

module.exports = {
  getOrderItems,
  getOrderItem,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
};
