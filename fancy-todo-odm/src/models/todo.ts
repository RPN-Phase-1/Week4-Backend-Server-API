import { Schema, Types, model } from "mongoose";

export const TodoModel = model("Todo", new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  userId: { type: Types.ObjectId, ref: "User" }
}));
