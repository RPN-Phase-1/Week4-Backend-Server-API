const express = require('express')
const router = express.Router();
const userRouter = require('./user-routes')
const todoRouter = require('./todo-routes')

router.use('/user', userRouter)
router.use('/todo', todoRouter)

module.exports = router