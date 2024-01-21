const express = require('express');
const authRoute = require('./auth.route');
const categoryRoute = require('./category.route');
const productRoute = require('./product.route');
const usersRoute = require('./user.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/category',
    route: categoryRoute,
  },
  {
    path: '/product',
    route: productRoute,
  },
  {
    path: '/users',
    route: usersRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
