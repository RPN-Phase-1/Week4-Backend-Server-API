const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);

    res.status(httpStatus.CREATED).send({
        status: httpStatus.CREATED,
        message: "Create User Success",
        data: user
    });
});

const getUsers = catchAsync(async (req, res) => {
    const filter = {
        keyword: req.query.name
    }
    const pagingOption = {
        page: req.query.page,
        maxRow: req.query.maxRow,
    }
    const result = await userService.queryUsers(filter, pagingOption);

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: "Get Users Success",
        data: result
    });
});

const getUser = catchAsync(async (req, res) => {
    const user = await userService.getUserById(req.params.userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: "Get User Success",
        data: user
    });
});

const updateUser = catchAsync(async (req, res) => {
    const user = await userService.updateUserById(req.params.userId, req.body);

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: "Update User Success",
        data: user
    });
});

const deleteUser = catchAsync(async (req, res) => {
    await userService.deleteUserById(req.params.userId);

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: "Delete User Success",
        data: null
    });
});

const getProductsByUser = catchAsync(async (req, res) => {
    const products = await userService.queryProducts(req.params.userId);
    if (!products) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Products not found');
    }

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: "Get Products by User Success",
        data: products
    });
})

const getOrdersByUser = catchAsync(async (req, res) => {
    const orders = await userService.queryOrders(req.params.userId);
    if (!orders) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Orders not found');
    }

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: "Get Orders by User Success",
        data: orders
    });
})

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getProductsByUser,
    getOrdersByUser,
};