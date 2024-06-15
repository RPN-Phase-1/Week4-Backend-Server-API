import type { Types } from "mongoose";

export class SchemaModel {
  public async all(): Promise<any> {
    throw ReferenceError("Must overide");
  }
  public async show(_id: Types.ObjectId): Promise<any> {
    throw ReferenceError("Must overide");
  }
  public async create(..._args: any): Promise<any> {
    throw ReferenceError("Must overide");
  }
  public async update(..._args: any): Promise<any> {
    throw ReferenceError("Must overide");
  }
  public async delete(_id: Types.ObjectId): Promise<any> {
    throw ReferenceError("Must overide");
  }
}
