import { Router } from "express";
const shareLinkRoute = Router()
import {shareableLink } from "../controllers/share.js";
shareLinkRoute.route("/:hash").get(shareableLink);

export default shareLinkRoute;