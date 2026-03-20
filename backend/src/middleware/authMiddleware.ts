import dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";
dotenv.config();
import jwt from "jsonwebtoken";
import { de } from "zod/locales";

// interface AuthRequest extends Request {
//   userId?: string;
// }

export const userMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const header = req.headers["authorization"];
  const decodedUser = jwt.verify(
    header as string,
    process.env.JWT_SECRET as string,
  );
  if (decodedUser) {
    if (typeof decodedUser !== "string") {
      req.userId = decodedUser.id;
      next();
    }
  } else {
    res.status(403).json({ message: "You are not logged in" });
  }
};
