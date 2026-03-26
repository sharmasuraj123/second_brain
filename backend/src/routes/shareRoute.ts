import { Router } from "express";
const shareRoute = Router()
import { brainShare} from "../controllers/share.js";

shareRoute.route("/share").post(brainShare);

export default shareRoute;
