import express, { type Request, type Response } from "express";
import { contentModel } from "../dbSchema.js";
import mongoose from "mongoose";

export const AddContent = async (req: Request, res: Response) => {
  try {
    const { link, type, title } = req.body;

    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await contentModel.create({
      link,
      type,
      title,
      tags: [],
      userId: new mongoose.Types.ObjectId(req.userId),
    });

    return res.json({
      message: "Content is added.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const GetContent = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = req.userId;
    const content = await contentModel
      .find({
        userId: userId,
      })
      .populate({ path: "userId", select: "userName" })
      .lean();

    if (content.length === 0) {
      return res.status(404).json({
        message: "No content found",
      });
    }

    return res.status(200).json({
      content,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const DeleteContent = async (req: Request, res: Response) => {
  try {
    const { contentId } = req.body;

    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return res.status(400).json({ message: "Invalid contentId" });
    }

    const deletedContent = await contentModel.findOneAndDelete({
      _id: contentId,
      userId: req.userId,
    });

    if (!deletedContent) {
      return res.status(404).json({
        message: "Content not found or not authorized",
      });
    }

    return res.status(200).json({
      message: "Content deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};


