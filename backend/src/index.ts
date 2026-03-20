import express from "express"
import cors from 'cors'
const app = express()
import connectDB from "./config/dbConnection.js"
import authRouter from "./routes/authRoute.js"
import { userMiddleware } from "./middleware/authMiddleware.js"
import contentRoute from "./routes/contentRoute.js"
app.use(cors())
app.use(express.json());
connectDB();

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/content", userMiddleware, contentRoute);


app.listen(3000, () => {
    console.log("Server running on 3000")
})