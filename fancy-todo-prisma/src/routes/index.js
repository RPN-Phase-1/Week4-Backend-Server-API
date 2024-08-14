const express = require("express")
const router = express.Router()

const todoRoute = require("./todo.route")
const userRouter = require("./user.route")

router.use("/todo",todoRoute)
router.use("/user", userRouter)

module.exports = router