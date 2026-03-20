import { Router } from "express";
const authRouter = Router();

import { signUp } from "../controllers/auth.js";
import {signIn} from "../controllers/auth.js"

authRouter.route("/signup").post(signUp);
authRouter.route("/signin").post(signIn);

export default authRouter;
