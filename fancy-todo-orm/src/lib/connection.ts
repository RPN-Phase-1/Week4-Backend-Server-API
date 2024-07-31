import { PrismaClient } from "@prisma/client";
import type { Service } from "#todo/lib/service";
import { UserService } from "#todo/services/user";
import { TodoService } from "#todo/services/todo";

export class DatabaseConnection {
  private db = new PrismaClient();
  private services = new Map<string, Service>();

  public constructor() {
    this.registerService();
  }

  private registerService() {
    this.services.set("user", new UserService(this.db));
    this.services.set("todo", new TodoService(this.db));
  }

  public get(name: "user"): UserService
  public get(name: "todo"): TodoService
  public get(name: string): Service | undefined {
    return this.services.get(name);
  }
}
