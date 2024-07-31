import type { PrismaClient } from "@prisma/client";

export class Service {
  public constructor(public db: PrismaClient) {}

  public async all(): Promise<any> {
    throw ReferenceError("Must be overrided");
  }

  public async show(_id: string): Promise<any> {
    throw ReferenceError("Must be overrided");
  }

  public async create(..._args: any): Promise<any> {
    throw ReferenceError("Must be overrided");
  }

  public async update(_id: string, ..._args: any): Promise<any> {
    throw ReferenceError("Must be overrided");
  }

  public async delete(_id: string): Promise<any> {
    throw ReferenceError("Must be overrided");
  }
}
