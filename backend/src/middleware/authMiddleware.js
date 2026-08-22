import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export const userMiddleware = async (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) {
    return res.status(403).json({ message: "You are not logged in" });
  }
  try {
    const decodedUser = jwt.verify(header, process.env.JWT_SECRET);
    if (decodedUser && typeof decodedUser !== "string") {
      req.userId = decodedUser.id;
      next();
    } else {
      res.status(403).json({ message: "You are not logged in" });
    }
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

