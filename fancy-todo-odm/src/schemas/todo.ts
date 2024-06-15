import { SchemaModel } from "#todo/lib/schemaModel";
import { TodoModel } from "#todo/models/todo";
import type { Types } from "mongoose";

export class TodoSchema extends SchemaModel {
  public override async all() {
    return await TodoModel.find();
  }

  public override async show(id: Types.ObjectId) {
    return await TodoModel.findOne({ _id: id });
  }

  public override async create(title: string, description: string, status: string, userId: Types.ObjectId) {
    return await TodoModel.create({ title, description, status, userId });
  }

  public override async update(id: Types.ObjectId, title: string, description: string, status: string, userId: Types.ObjectId) {
    return await TodoModel.updateOne({ _id: id }, { title, description, status, userId });
  }

  public override async delete(id: Types.ObjectId) {
    return await TodoModel.deleteOne({ _id: id });
  }
}
