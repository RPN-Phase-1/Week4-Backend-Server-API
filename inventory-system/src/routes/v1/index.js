const express = require('express');
const authRoute = require('./auth.route');
const categoryRoute = require('./category.route');

const router = express.Router();

const defaultRoute = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/category',
    route: categoryRoute,
  },
];

defaultRoute.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
