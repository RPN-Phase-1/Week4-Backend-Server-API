const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

router.route('/user')
    .get(userController.getUser)
    .post(userController.createUser)

router
.get('/user/:id', userController.getUserById)
.put('/user/:id', userController.updateUser)
.delete('/user/:id', userController.deleteUserById)

module.exports = router