const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const ApiError = require('../utils/ApiError');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: 'Create User Success',
    data: user,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const filter = { name: req.query.name };
  const options = {
    take: req.query.take || 10,
    page: req.query.page || 1,
    sort: req.query.sort === 'a-z' ? { name: 'asc' } : { name: 'desc' },
  };

  options.skip = (options.page - 1) * (options.take || 10);

  const users = await userService.queryUsers(filter, options);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get Users Success',
    data: users,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get User Success',
    data: user,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUser(req.params.userId, req.body);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Update User Success',
    data: user,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Create User Success',
    data: user,
  });
});

const getUserByEmail = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Create User Success',
    data: user,
  });
});

// const getUserById = catchAsync(async (req, res) => {
//   const user = await userService.getUserById(req.params.userId);

//   res.send(user);
// });

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
};
