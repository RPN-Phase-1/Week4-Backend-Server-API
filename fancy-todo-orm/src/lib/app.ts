import express from "express";

import { DatabaseConnection } from "#todo/lib/connection";
import { UsersRouter } from "#todo/routes/users";
import { TodosRouter } from "#todo/routes/todos";
import { UsersIDRouter } from "#todo/routes/users+id";
import { TodosIDRouter } from "#todo/routes/todos+id";

export class App {
  public app = express();
  public port = 8080;
  public router = express.Router();
  public connection = new DatabaseConnection();

  public constructor() {
    this.registerRouter();
    this.app
      .use(express.json())
      .use(this.router);
  }

  public init() {
    this.app.listen(this.port, () => console.log("Listen on port", this.port));
  }

  private registerRouter() {
    this.router.route("/").all((_, res) => res.json("Helo todo!"));

    new TodosIDRouter(this.connection, this.router);
    new TodosRouter(this.connection, this.router);
    new UsersIDRouter(this.connection, this.router);
    new UsersRouter(this.connection, this.router);
  }
}
