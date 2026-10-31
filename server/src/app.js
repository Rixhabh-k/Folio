import express from "express"
import authRouter from "./routes/auth.routes.js"
import linkRouter from "./routes/links.routes.js"
import cookiePasrer from "cookie-parser"
import cors from "cors"

const app = express()

//middlewares
app.use(express.json())
app.use(cookiePasrer())

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/api/auth",authRouter)
app.use("/api/links",linkRouter)

export default app