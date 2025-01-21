const express = require('express');
const router = express.Router();
const userRouter = require('./user.route');
const categoryRouter = require('./category.route');
const productRouter = require('./product.route');
const orderRouter = require('./order.route');

router.use('/users', userRouter)
router.use('/categories', categoryRouter)
router.use('/products', productRouter)
router.use('/orders', orderRouter)

module.exports = router