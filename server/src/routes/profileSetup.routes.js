import express from "express"
import multer from "multer"
import {verifyUser} from "../middlewares/auth.middleware.js"

import { setupProfile } from "../controllers/setupProfile.controller.js"

const upload = multer({storage:multer.memoryStorage()})

const setupRouter = express.Router()

setupRouter.post("/",verifyUser,upload.single("profileImage"),setupProfile)

export default setupRouter