const express = require('express');
const httpStatus = require('http-status');
const helmet = require('helmet');
const compression = require('compression');
const xss = require('xss-clean');
const cors = require('cors');
const config = require('./src/config/config');
const morgan = require('./src/config/morgan');
const { errorConverter, errorHandler } = require('./src/middlewares/error');
const ApiError = require('./src/utils/apiError');
// const router = require('./src/routes');

const app = express();
if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}
app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(xss());

app.use(compression);

app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

// app.use(router);
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not Found'));
});
app.use(errorConverter);
app.use(errorHandler);
module.exports = app;
