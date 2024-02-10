const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService } = require('../services');
const ApiError = require('../utils/apiError');

const register = catchAsync(async (req, res) => {
  const existingUser = await userService.getUserByEmail(req.body.email);

  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  const userCreated = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(userCreated);
  res.status(httpStatus.CREATED).send({ userCreated, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const refresh = catchAsync(async (req, res) => {
  const token = await tokenService.refreshToken(req.body.token);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Refresh Token Success',
    data: token,
  });
});

const logout = catchAsync(async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  await tokenService.deleteToken(token);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    mesage: 'Logout Success',
    data: null,
  });
});

module.exports = { register, login, refresh, logout };
