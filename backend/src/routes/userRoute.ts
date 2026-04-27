import { Router } from "express";
import { userinfo } from "../controllers/userinfo.js";
const userRouter = Router();
userRouter.route("/me").get(userinfo);
export default userRouter


