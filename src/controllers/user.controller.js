const httpStatus = require("http-status");
const { userService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

const createUser = catchAsync(async (req, res) => {
  const existingUser = await userService.getUserByEmail(req.body.email);

  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }

  const user = await userService.createUser(req.body);

  res.status(httpStatus.CREATED).json({
    status: httpStatus.CREATED,
    message: "Successfully Create User",
    data: user,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const { page, size } = req.query;
  const skip = page * size - size;

  const users = await userService.getAllUsers(skip, Number(size));

  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    message: "Successfully Get All Users",
    data: users,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Successfully get user",
    data: user,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const userUpdated = await userService.updateUser(userId, req.body);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Successfully update user",
    data: userUpdated,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUser(req.params.userId);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Successfully delete user",
    data: null,
  });
});

const getOrderByUser = catchAsync(async (req, res) => {
  const orders = await userService.getOrderByUser(req.params.userId);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Successfully get orders",
    data: orders,
  });
});

const getProductByUser = catchAsync(async (req, res) => {
  const products = await userService.getProductByUser(req.params.userId);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Successfully get products",
    data: products,
  });
});

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getOrderByUser,
  getProductByUser,
};
