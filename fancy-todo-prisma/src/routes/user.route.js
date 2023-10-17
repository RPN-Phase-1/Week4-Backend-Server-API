const express = require("express")
const router = express.Router();
const userController = require("../controller/user.controller");

router
    .route('/')
    .get(userController.getUser)
    .post(userController.createUser)

router.route('/:id')
      .put(userController.updateUser)
      .delete(userController.deleteUser)
      .get(userController.findUser)

module.exports = router;
