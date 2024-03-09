const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../service/index');
const ApiError = require('../utils/apiError');

const getAllUsers = catchAsync(async (req, res) => {
  const result = await userService.getAllUsers();

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get All Users Success!',
    data: result,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const result = await userService.getUserById(req.params.userId);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get User By ID Success',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const result = await userService.updateUser(req.params.userId, req.body);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Update User Success!',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const result = await userService.deleteUser(req.params.userId);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Update User Success!',
    data: result,
  });
});

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};