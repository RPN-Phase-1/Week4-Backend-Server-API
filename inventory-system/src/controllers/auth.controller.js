const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService } = require('../services');
const ApiError = require('../utils/ApiError');
const { attachCookiesToResponse } = require('../utils/attachCookieToRes');

const register = catchAsync(async (req, res) => {
  const existingUser = await userService.getUserByEmail(req.body.email);

  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  const userCreated = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(userCreated);
  attachCookiesToResponse({ res, tokens });

  res.status(httpStatus.CREATED).send({
    user: {
      id: userCreated.id,
      name: userCreated.name,
      email: userCreated.email,
      role: userCreated.role,
    },
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);

  attachCookiesToResponse({ res, tokens });

  res.status(httpStatus.OK).send({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

const logout = catchAsync(async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(httpStatus.OK).json({ success: true, message: 'User Logged Out' });
});

module.exports = {
  register,
  login,
  logout,
};
