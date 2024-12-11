const express = require("express")
const router = express.Router();
const userRoute = require("./user.route")
const todoRoute = require("./todo.route")

router.use("/User", userRoute)
router.use("/Todo", todoRoute)

module.exports = router;
