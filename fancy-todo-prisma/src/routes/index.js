const express = require('express')
const router = express.Router()
const routerUser = require('./user.route')
const routeTodo = require('./todo.route')

router.use( routerUser)
router.use( routeTodo)

module.exports = router