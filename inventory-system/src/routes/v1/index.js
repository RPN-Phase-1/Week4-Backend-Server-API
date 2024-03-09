const express = require('express');
const authRouter = require('./auth.route');
const categoryRouter = require('./category.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/category',
    route: categoryRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
