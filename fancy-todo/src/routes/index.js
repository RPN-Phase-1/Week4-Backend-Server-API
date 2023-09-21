import express from "express";
import { router as userRoute } from "./user.route.js";
import { router as todoRoute } from "./todo.route.js";

const router = express.Router()

router.use("/user", userRoute)
router.use("/todo", todoRoute)

export { router }