const express = require("express");
const authRouter = require("./auth.route.js");
const userRouter = require("./user.route.js");
const productRouter = require("./product.route.js");
const categoryRouter = require("./category.route.js");
const orderRouter = require("./order.route.js");
const orderItemRouter = require("./orderItem.route.js");

const router = express.Router();

const defaultRouter = [
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/product",
    route: productRouter,
  },
  {
    path: "/category",
    route: categoryRouter,
  },
  {
    path: "/order",
    route: orderRouter,
  },
  {
    path: "/order-item",
    route: orderItemRouter,
  },
];

defaultRouter.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
