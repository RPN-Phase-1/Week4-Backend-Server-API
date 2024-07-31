import { SchemaModel } from "#todo/lib/schemaModel";
import { UserModel } from "#todo/models/user";
import type { Types } from "mongoose";


export class UserSchema extends SchemaModel {
  public override async all() {
    return await UserModel.find();
  }

  public override async show(id: Types.ObjectId) {
    return await UserModel.findOne({ _id: id });
  }

  public override async create(name: string, email: string, phoneNumber: number) {
    return await UserModel.create({ name, email, phoneNumber });
  }

  public override async update(id: Types.ObjectId, name: string, email: string, phoneNumber: number) {
    return await UserModel.updateOne({ _id: id }, { name, email, phoneNumber });
  }

  public override async delete(id: Types.ObjectId) {
    return await UserModel.deleteOne({ _id: id });
  }
}
