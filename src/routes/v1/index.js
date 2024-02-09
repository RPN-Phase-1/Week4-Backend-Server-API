const express = require("express");
const authRouter = require("./auth.route");
const userRouter = require("./user.route");
const productRouter = require("./product.route");
const categoryRouter = require("./category.route");
const orderRouter = require("./order.route");
const orderItemRouter = require("./orderItem.route");

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
