import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
export const userModel = mongoose.model("User", userSchema);

const titleSchema = new Schema({
  title: { type: String, required: true, unique: true },
});
export const titleModel = mongoose.model("Title", titleSchema);

const contentTypes = ["twitter", "youtube", "linkedin", "link", "document"];
const contentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});
export const contentModel = mongoose.model("Content", contentSchema);

const linkSchema = new Schema({
  hash: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
   },
});
export const linkModel = mongoose.model("Links", linkSchema);
