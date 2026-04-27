import express, { type Request, type Response } from "express";
import { contentModel, linkModel, userModel } from "../dbSchema.js";
import mongoose from "mongoose";
import { random } from "../utils.js";

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
        hash: hash,
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
    const hash = req.params.hash;
    console.log("Looking for hash:", hash);
    if (!hash) {
      return res.status(400).json({
        message: "Hash is required",
      });
    }

    const link = await linkModel.findOne({ hash }).lean();
    console.log("Found link:", link);
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

export const cardContentShare = async (req: Request, res: Response) => {
  try {
    const contentId = req.params.contentId;
    const content = await contentModel.findOne({ _id: contentId });

    if (!content) {
      return res.status(404).json({ message: "Link not found" });
    }

    return res.json({ link: content.link });
  } catch (e) {
    res.status(400).json({ message: "Invalid Link ID" });
  }
};
