const express = require('express');

const app = express();
const router = require('./src/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', () => {
  res.send('Hello World');
});

app.use(router);

module.exports = app;
