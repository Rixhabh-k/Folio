import express from "express"
import { createLink } from "../controllers/links.controller.js"
import  {verifyUser} from "../middlewares/auth.middleware.js"


const linkRouter = express.Router()

linkRouter.post("/create-links",verifyUser,createLink)

export default linkRouter