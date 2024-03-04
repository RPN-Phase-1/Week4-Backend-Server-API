const express = require('express');
const config = require('./src/config/config');
const morgan = require('./src/config/morgan');
// const router = require('./src/routes');
const app = express();
if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Hello World');
});

// app.use(router);

module.exports = app;
