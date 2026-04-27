import { Router } from "express";
const shareCardRoute = Router();
import { cardContentShare } from "../controllers/share.js";

shareCardRoute.route("/:contentId").get(cardContentShare);

export default shareCardRoute;
