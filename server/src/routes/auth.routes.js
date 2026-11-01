import express from "express";
import {
  registerUser,
  verifyEmail,
  loginUser,
  getMe,
  forgetUsername,
  verifyUsernameOtp,
  forgetPassword,
  verifyForgetPasswordOtp,
  resetPassword,
} from "../controllers/auth.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.get("/verify-email", verifyEmail);
authRouter.post("/login", loginUser);
authRouter.post("/login", loginUser);
authRouter.post("/forget-username", forgetUsername);
authRouter.post("/verify-username", verifyUsernameOtp);

authRouter.post("/forgot-password", forgetPassword);
authRouter.post("/verify-forgot-password-otp", verifyForgetPasswordOtp);
authRouter.post("/resetPassword", resetPassword);

export default authRouter;
