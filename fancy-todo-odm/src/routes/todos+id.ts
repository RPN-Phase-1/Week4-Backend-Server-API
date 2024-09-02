import { Router } from "#todo/lib/router";
import type { Request, Response } from "express";
import { Types } from "mongoose";

export class TodosIDRouter extends Router {
  public override exec() {
    this.router
      .route("/todos/:id")
      .get((req, res) => this.controllerGet(req, res))
      .delete((req, res) => this.controllerDelete(req, res))
      .put((req, res) => this.controllerPut(req, res));
  }

  private async controllerGet(request: Request<{ id: string }>, response: Response) {
    try {
      const id = new Types.ObjectId(request.params.id);
      const result = await this.schema.get("todo").show(id);
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json((error as Error).message);
    }
  }

  private async controllerDelete(request: Request<{ id: string }>, response: Response) {
    try {
      const id = new Types.ObjectId(request.params.id);
      const result = await this.schema.get("todo").delete(id);
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json((error as Error).message);
    }
  }

  private async controllerPut(request: Request<{ id: string }>, response: Response) {
    try {
      const id = new Types.ObjectId(request.params.id);
      const { title, description, status, userId} = request.body;
      if (!title || !description || !status || !userId) throw Error("Missing something on body");
      await this.schema.get("todo").update(id, title, description, status, userId);
      response.status(200).json(`Succes update todo with document id: ${id}`);
    } catch (error) {
      response.status(400).json((error as Error).message);
    }
  }
}
