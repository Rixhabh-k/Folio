import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export async function verifyUser(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "token not found",
      });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decode.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "User is unauthorized",
    });
  }
}
