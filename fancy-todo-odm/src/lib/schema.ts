import { UserSchema } from "#todo/schemas/user";
import type { SchemaModel } from "#todo/lib/schemaModel";
import { TodoSchema } from "#todo/schemas/todo";

export class SchemaCollection {
  public collection = new Map<string, SchemaModel>();

  public constructor() {
    this.registerSchema();
  }

  public get(name: "user"): UserSchema
  public get(name: "todo"): TodoSchema
  public get(name: string): SchemaModel | undefined {
    return this.collection.get(name);
  }

  private registerSchema() {
    this.collection.set("user", new UserSchema());
    this.collection.set("todo", new TodoSchema());
  }
}

