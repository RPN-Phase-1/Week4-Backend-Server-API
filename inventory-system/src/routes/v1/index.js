const express = require("express");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
// const productRoute = require("./product.route");
// const categoryRoute = require("./category.route");
// const orderRoute = require("./order.route");
// const orderItemRoute = require("./orderItem.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/product",
    route: productRoute,
  },
  {
    path: "/category",
    route: categoryRoute,
  },
  {
    path: "/order",
    route: orderRoute,
  },
  {
    path: "/orderItem",
    route: orderItemRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
