const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService } = require('../services');
const ApiError = require('../utils/ApiError');

const register = catchAsync(async (req, res) => {
  const existingUser = await userService.getUserByEmail(req.body.email);

  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  const userCreated = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(userCreated);

  res.status(httpStatus.CREATED).send({
    user: {
      id: userCreated.id,
      name: userCreated.name,
      email: userCreated.email,
      role: userCreated.role,
    },
    tokens,
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);

  res.status(httpStatus.OK).send({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    tokens,
  });
});

const logout = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  if (!token || !token.startsWith('Bearer ')) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized, please login/register first');
  }

  const splittedToken = token.split('Bearer ')[1];

  await tokenService.deleteToken(splittedToken);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Logout Success',
    data: null,
  });
});

const refreshTokens = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  if (!token || !token.startsWith('Bearer ')) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized, please login/register first');
  }

  const splittedToken = token.split('Bearer ')[1];

  const tokens = await tokenService.refreshTokens(splittedToken);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Refresh Token Success',
    data: tokens,
  });
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
};
