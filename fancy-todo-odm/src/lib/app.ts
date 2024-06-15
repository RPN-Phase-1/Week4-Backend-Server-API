import express from "express";
import mongoose from "mongoose";

import "#todo/lib/env";

import { SchemaCollection } from "#todo/lib/schema";
import { UsersRouter } from "#todo/routes/users";
import { TodosRouter } from "#todo/routes/todos";
import { UsersIDRouter } from "#todo/routes/users+id";
import { TodosIDRouter } from "#todo/routes/todos+id";

export class App {
  public app = express();
  public port = process.env.PORT || 3000;
  public router = express.Router();
  public schema = new SchemaCollection();

  public constructor() {
    this.registerRouter();
    this.app
      .use(express.json())
      .use(this.router);
  }

  public init() {
    this.app.listen(this.port, () => console.log("Listen on port", this.port));

    return mongoose.connect(process.env.DATABASE_URL as string);
  }

  private registerRouter() {
    this.router.route("/").all((_, res) => res.json("Helo todo!"));

    new TodosIDRouter(this.schema, this.router);
    new TodosRouter(this.schema, this.router);
    new UsersIDRouter(this.schema, this.router);
    new UsersRouter(this.schema, this.router);
  }
}
