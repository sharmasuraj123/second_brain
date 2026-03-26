import express, { type Request, type Response } from "express";
import { contentModel, linkModel, userModel } from "../dbSchema.js";
import mongoose from "mongoose";
import { random } from "../utils.js";

// export const brainShare = async (req: Request, res: Response) => {
//     const share = req.body.share
//     if (!req.userId) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//     if (share) {
//         await linkModel.create({
//             userId: req.userId,
//             hash:random(10)
//         })
//     } else {
//         await linkModel.deleteOne({
//             userId:req.userId
//         })
//     }

//     res.json({
//         message:"Updated shareable link"
//     })
// }

export const brainShare = async (req: Request, res: Response) => {
  try {
    const share = req.body.share;

    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (share) {
      const hash = random(10);

      await linkModel.findOneAndUpdate(
        { userId: req.userId },
        { hash },
        { upsert: true, new: true },
      );

      return res.json({
          message: "/share/" + hash,
          hash:hash
      });
    } else {
      await linkModel.deleteOne({
        userId: req.userId,
      });

      return res.json({
        message: "Share link removed",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const shareableLink = async (req: Request, res: Response) => {
  try {
    const hash = req.params.shareLink;

    if (!hash) {
      return res.status(400).json({
        message: "Hash is required",
      });
    }

    const link = await linkModel.findOne({ hash }).lean();

    if (!link) {
      return res.status(404).json({
        message: "Link not found",
      });
    }

    const content = await contentModel
      .find({
        userId: link.userId,
      })
      .lean();

    const user = await userModel
      .findOne({
        _id: link.userId,
      })
      .lean();

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      userName: user.userName,
      content,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};