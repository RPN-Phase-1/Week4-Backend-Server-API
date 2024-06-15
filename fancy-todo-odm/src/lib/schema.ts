import { UserSchema } from "#todo/schemas/user";
import type { Types } from "mongoose";

export class SchemaCollection {
  public collection = new Map<string, SchemaModel>();

  public constructor() {
    this.registerSchema();
  }

  public get(name: "user"): UserSchema
  public get(name: "todo"): SchemaModel
  public get(name: string): SchemaModel | undefined {
    return this.collection.get(name);
  }

  private registerSchema() {
    this.collection.set("user", new UserSchema());
  }
}

export class SchemaModel {
  public async all(): Promise<any> {}
  public async show(_id: Types.ObjectId): Promise<any> {}
  public async create(..._args: any): Promise<any> {}
  public async update(..._args: any): Promise<any> {}
  public async delete(_id: Types.ObjectId): Promise<any> {}
}
