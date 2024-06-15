import type { Router as ExpressRouter } from "express";
import type { SchemaCollection } from "#todo/lib/schema";

export class Router {
  public constructor(public schema: SchemaCollection, public router: ExpressRouter) {
    this.exec();
  }

  public exec() {}
}
