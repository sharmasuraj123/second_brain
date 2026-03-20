import { Router } from "express";
const contentRoute = Router()
import { AddContent,GetContent,DeleteContent } from "../controllers/content.js";

contentRoute.route("/").post(AddContent);
contentRoute.route("/").get(GetContent);
contentRoute.route("/delete").delete(DeleteContent);
export default contentRoute;