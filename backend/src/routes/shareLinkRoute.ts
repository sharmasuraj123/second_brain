import { Router } from "express";
const shareLinkRoute = Router()
import {shareableLink } from "../controllers/share.js";
shareLinkRoute.route("/:shareLink").get(shareableLink);

export default shareLinkRoute;