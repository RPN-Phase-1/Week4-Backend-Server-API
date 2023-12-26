const httpStatus = require('http-status');
const { userService } = require('../services');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const getUsers = catchAsync(async (req, res) => {
  const { page, size } = req.query;
  const user = await userService.getUser(parseInt(page), parseInt(size));

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

module.exports = {
  getUserByEmail,
  getUsers,
};
