const express = require("express");
const httpStatus = require("http-status");
const helmet = require("helmet");
const xss = require("xss-clean");
const compression = require("compression");
const cors = require("cors");
const passport = require("passport");
const router = require("./routes/v1");
const config = require("./config/config");
const morgan = require("./config/morgan");
const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const jwtStrategy = require("./config/passport");

const app = express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// set security HTTP headers
app.use(helmet());

// aktifin parsing json
app.use(express.json());

// aktifin urlencoded
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

// v1 api routes
app.use("/v1", router);

// send 404 error jika route tidak ada
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "API Not found"));
});

// convert error jadi Instance API Error jika ada error yang tidak ketangkap
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
