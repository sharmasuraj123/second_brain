import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import connectDB from "./config/dbConnection.js";
import authRouter from "./routes/authRoute.js";
import { userMiddleware } from "./middleware/authMiddleware.js";
import contentRoute from "./routes/contentRoute.js";
import shareBrain from "./routes/shareRoute.js";
import shareLinkRoute from "./routes/shareLinkRoute.js";
import shareCardRoute from "./routes/shareCardRoute.js";
import userRouter from "./routes/userRoute.js";
import aiRoutes from "./routes/aiRoutes.js";

app.use(cors());
app.use(express.json());
connectDB();
app.use("/api/v1/ai", userMiddleware, aiRoutes);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/content", userMiddleware, contentRoute);
app.use("/api/v1/brain", userMiddleware, shareBrain);
app.use("/api/v1/brainsharelink", shareLinkRoute);
app.use("/api/v1/contentShare", userMiddleware, shareCardRoute);
app.use("/api/v1/user", userMiddleware, userRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});