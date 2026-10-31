import express from "express"
import { registerUser, verifyEmail, loginUser, getMe } from "../controllers/auth.controller.js"
import { verifyUser } from "../middlewares/auth.middleware.js"

const authRouter = express.Router()

authRouter.post("/register",registerUser)
authRouter.get("/verify-email",verifyEmail)
authRouter.post("/login",loginUser)
authRouter.get("/get-me",verifyUser,getMe)


export default authRouter
