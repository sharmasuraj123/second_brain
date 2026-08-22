import { userModel } from "../dbSchema.js";

export const userinfo = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    const user = await userModel.findById(userId).select("userName");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ userName: user.userName });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};


