import * as z from "zod";
import * as express from "express";
import { userModel } from "../dbSchema.js";
import type { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { error } from "node:console";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const signupSchema = z.object({
  userName: z.string().min(3, "Username must be at least 3 chars"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .refine((val) => /[!@#$%^&*]/.test(val), {
      message:
        "Password must contain at least one special character (!@#$%^&*)",
    }),
});

export const signUp = async (req: Request, res: Response) => {
  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json(result.error);
  }
  const { userName, password } = result.data;

  try {
    //Hashing the pass
    const salt = 5;
    const hashedPass = await bcrypt.hash(password, salt);

    const existingUser = await userModel.findOne({ userName });

    if (existingUser) {
      return res.status(411).json({
        message: "Username already exists",
      });
    }

    const newUser = await userModel.create({
      userName: userName,
      password: hashedPass,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (e) {
    res.json("errror in singUp");
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { userName, password } = req.body;
  const user = await userModel.findOne({
    userName,
  });
  if (!user) {
    return res.status(404).json("user not found");
  }
  console.log(user);
  const decodedUser = await bcrypt.compare(password, user.password);
  if (!decodedUser) {
    return res.status(401).json("Incorrect password.");
  }
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET as string,
  );

  return res.status(200).json({ message: "Login successful", token });
};
