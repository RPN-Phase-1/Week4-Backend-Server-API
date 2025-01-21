const express = require('express');
const router = express.Router();
const userRouter = require('./user.route');
const categoryRouter = require('./category.route');

router.use('/users', userRouter)
router.use('/categories', categoryRouter)

module.exports = router