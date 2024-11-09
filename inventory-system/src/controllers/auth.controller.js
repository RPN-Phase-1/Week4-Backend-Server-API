const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService } = require('../services');
const ApiError = require('../utils/ApiError');
const { loginUser } = require('../services/auth.service');


const registerView = catchAsync(async(req, res)=>{

  res.render('./auth/register', {layout:false})

})

const register = catchAsync(async (req, res) => {
  const existingUser = await userService.getUserByEmail(req.body.email);

  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  const userCreated = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(userCreated);
  res.status(httpStatus.CREATED).send({ userCreated, tokens });
});

const loginView = catchAsync(async(req, res)=>{

  res.render('./auth/login', {layout:false})

})
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.render('index',{ user, tokens });
});

module.exports = {
  loginView,
  registerView,
  register,
  login,
  
};
