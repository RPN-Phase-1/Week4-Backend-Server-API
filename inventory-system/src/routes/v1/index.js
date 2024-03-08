const express = require('express');
const authRouter = require('./auth.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
