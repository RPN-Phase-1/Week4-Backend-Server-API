import { Schema, model } from "mongoose";

export const UserModel = model("User", new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
}));
