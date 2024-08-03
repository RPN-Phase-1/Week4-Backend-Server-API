const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const ApiError = require('../utils/ApiError');

const getUsers = catchAsync(async (req, res) => {
  const filter = {
    name: req.query.name,
    role: req.query.role,
    email: req.query.email,
  };
  const options = {
    take: req.query.take,
    skip: req.query.skip,
  };

  const result = await userService.getUsers(filter, options);

  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    message: 'Get Users Success',
    data: result,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const result = await userService.getUserById(req.params.userId);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User ID not found');
  }

  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    message: 'Get User Success',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const userExist = await userService.getUserById(req.params.userId);
  if (!userExist) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  const result = await userService.updateUserById(req.params.userId, req.body);

  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    message: "Update User success",
    data: result
  })
});

const deleteUser = catchAsync(async (req, res) => {
  const userExist = await userService.getUserById(req.params.userId);
  if (!userExist) throw new ApiError(httpStatus.NOT_FOUND, 'User Id not Found');

  await userService.deleteUserById(req.params.userId);

  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    message: 'Delete User Success',
    data: null,
  });
});

const queryProductByUser = catchAsync(async (req, res) => {
  const product = await userService.queryProductByUser(req.params.userId);
  if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not Found');

  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    message: 'Get Product by User Success',
    data: product,
  });
});

const queryOrderByUser = catchAsync(async (req, res) => {
  const order = await userService.queryOrderByUser(req.params.userId);
  if (!order) throw new ApiError(httpStatus.NOT_FOUND, 'Order not Found');

  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    message: 'Get Product by User Success',
    data: order,
  });
});

module.exports = { getUsers, getUserById, updateUser, deleteUser, queryProductByUser, queryOrderByUser };
