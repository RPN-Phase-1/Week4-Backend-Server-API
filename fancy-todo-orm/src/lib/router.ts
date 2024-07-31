import type { Router as ExpressRouter } from "express";
import type { DatabaseConnection } from "#todo/lib/connection";

export class Router {
  public constructor(public connection: DatabaseConnection, public router: ExpressRouter) {
    this.exec();
  }

  public exec() {}
}
