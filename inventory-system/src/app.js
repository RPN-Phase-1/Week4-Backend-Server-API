const express = require('express');
const config = require('./config/config');
const morgan = require('./config/morgan');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
