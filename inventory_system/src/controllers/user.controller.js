const httpStatus = require('http-status');
const { userService } = require('../services');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const getUsers = catchAsync(async (req, res) => {
  const { search, page, size } = req.query;

  const filter = {
    contains: search,
  };

  const options = {
    skip: page,
    take: size,
  };

  const user = await userService.getUser(options, filter);

  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get All User Success',
    data: user,
  });
});

const getUserByEmail = catchAsync(async (req, res) => {
  const user = await userService.getUserByEmail(req.params.email);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get User Succes',
    data: user,
  });
});

const getOrderAndProduct = catchAsync(async (req, res) => {
  const { name } = req.params;
  const user = await userService.getOrderAndProductByUser(name);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get Order And Product By User Succes',
    data: user,
  });
});

module.exports = {
  getUserByEmail,
  getUsers,
  getOrderAndProduct,
};
