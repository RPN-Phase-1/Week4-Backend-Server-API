import { Router } from "#todo/lib/router";
import type { Request, Response } from "express";

export class TodosRouter extends Router {
  public override exec() {
    this.router
      .route("/todos")
      .get((req, res) => this.controllerGet(req, res))
      .post((req, res) => this.controllerPost(req, res));
  }

  private async controllerGet(_: Request, response: Response) {
    try {
      const result = await this.schema.get("todo").all();
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json((error as Error).message);
    }
  }

  private async controllerPost(request: Request, response: Response) {
    try {
      const { title, description, status, userId } = request.body;
      if (!title || !description || !status || !userId) throw Error("Missing something on body");
      const result = await this.schema.get("todo").create(title, description, status, userId);
      response.status(200).json(`Succes created Todo with id ${result._id}`);
    } catch (error) {
      response.status(400).json((error as Error).message);
    }
  }
}
