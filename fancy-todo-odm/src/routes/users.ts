import { Router } from "#todo/lib/router";
import type { Request, Response } from "express";

export class UsersRouter extends Router {
  public override exec() {
    this.router
      .route("/users")
      .get((req, res) => this.controllerGet(req, res))
      .post((req, res) => this.controllerPost(req, res));
  }

  private async controllerGet(_: Request, response: Response) {
    try {
      const result = await this.schema.get("user").all();
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json((error as Error).message);
    }
  }

  private async controllerPost(request: Request, response: Response) {
    try {
      const { name, email, phoneNumber } = request.body;
      if (!name || !email || !phoneNumber) throw Error("Missing something on body");
      const result = await this.schema.get("user").create(name, email, phoneNumber);
      response.status(200).json(`Succes created user with id ${result._id}`);
    } catch (error) {
      response.status(400).json((error as Error).message);
    }
  }
}
