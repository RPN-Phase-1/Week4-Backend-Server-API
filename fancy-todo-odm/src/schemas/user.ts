import { model, Schema, type Types } from "mongoose";
import { SchemaModel } from "#todo/lib/schema";

const mod = model("User", new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
}));

export class UserSchema extends SchemaModel {
  public override async all() {
    return await mod.find();
  }

  public override async show(id: Types.ObjectId) {
    return await mod.findOne({ _id: id });
  }

  public override async create(name: string, email: string, phoneNumber: number) {
    return await mod.create({ name, email, phoneNumber });
  }

  public override async update(id: Types.ObjectId, name: string, email: string, phoneNumber: number) {
    return await mod.updateOne({ _id: id }, { name, email, phoneNumber });
  }

  public override async delete(id: Types.ObjectId) {
    return await mod.deleteOne({ _id: id });
  }
}
