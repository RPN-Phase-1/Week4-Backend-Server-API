const userService = require("./user.service");
const bcrypt = require("bcrypt");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const loginWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Email not registered");
  }
  const validatePassword = await bcrypt.compare(password, user.password);

  if (!validatePassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password");
  }

  return user;
};

module.exports = { loginWithEmailAndPassword };
