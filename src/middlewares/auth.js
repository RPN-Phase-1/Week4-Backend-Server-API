const httpStatus = require("http-status");
const passport = require("passport");
const ApiError = require("../utils/ApiError");

const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
  if ((err, !user, info)) {
    reject(new ApiError(httpStatus.UNAUTHORIZED, "Please Authenticate"));
  }

  req.user = user;

  resolve();
};

const auth = () => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate("jwt", { session: false }, verifyCallback(req, resolve, reject))(req, res, next);
  })
    .then(() => next())
    .catch((error) => next(error));
};

const adminAuth = () => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate("jwt", { session: false }, verifyCallback(req, resolve, reject))(req, res, next);
  })
    .then(() => {
      if (req.user.role !== "admin") {
        throw new ApiError(httpStatus.FORBIDDEN, "Only admins are authorized to access this route");
      }
      next();
    })
    .catch((error) => next(error));
};

module.exports = { auth, adminAuth };
