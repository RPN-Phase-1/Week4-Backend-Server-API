const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { orderService } = require('../services');

const createOrder = catchAsync(async (req, res) => {
    const order = await orderService.createOrder(req.body);

    res.status(httpStatus.CREATED).send({
        status: httpStatus.CREATED,
        message: "Create Order Success",
        data: order
    });
});

const getOrders = catchAsync(async (req, res) => {
    const filter = {
        keyword: req.query.keyword
    }
    const pagingOption = {
        page: req.query.page,
        maxRow: req.query.maxRow,
    }
    const result = await orderService.queryOrders(filter, pagingOption);

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: "Get Orders Success",
        data: result
    });
});

const getOrder = catchAsync(async (req, res) => {
    const order = await orderService.getOrderById(req.params.orderId);
    if (!order) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
    }

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: "Get Order Success",
        data: order
    });
});

const updateOrder = catchAsync(async (req, res) => {
    const order = await orderService.updateOrderById(req.params.orderId, req.body);

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: "Update Order Success",
        data: order
    });
});

const deleteOrder = catchAsync(async (req, res) => {
    await orderService.deleteOrderById(req.params.orderId);

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: "Delete Order Success",
        data: null
    });
});

const getOrderItemsByOrder = catchAsync(async (req, res) => {
    const orderItems = await orderService.queryOrderItems(req.params.orderId);
    if (!orderItems) {
        throw new ApiError(httpStatus.NOT_FOUND, 'OrderItems not found');
    }

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: "Get OrderItems by Order Success",
        data: orderItems
    });
})

module.exports = {
    createOrder,
    getOrders,
    getOrder,
    updateOrder,
    deleteOrder,
    getOrderItemsByOrder
};