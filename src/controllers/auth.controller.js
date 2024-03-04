const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { userService, tokenService, authService } = require("../services");
const ApiError = require("../utils/ApiError");

const register = catchAsync(async (req, res) => {
  const existingUser = await userService.getUserByEmail(req.body.email);

  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }

  const userCreated = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(userCreated);

  res.status(httpStatus.CREATED).send({ userCreated, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const userLogin = await authService.loginWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(userLogin);

  res.status(httpStatus.OK).send({ userLogin, tokens });
});

module.exports = {
  register,
  login,
};
