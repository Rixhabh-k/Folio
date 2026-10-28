import express from "express"
import { registerUser, verifyEmail, loginUser } from "../controllers/auth.controller.js"

const authRouter = express.Router()

authRouter.post("/register",registerUser)
authRouter.get("/verify-email",verifyEmail)
authRouter.post("/login",loginUser)


export default authRouter
