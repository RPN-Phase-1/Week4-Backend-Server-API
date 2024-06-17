import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import RouterBuilder from '../../../lib/models/RouterBuilder';
import { AddMiddleware } from '../../../lib/utils/RouterDecorator';
import AuntheticationMiddleware from '../../../lib/middlewares/AuthenticationMiddleware';
import CategoryService from '../../../services/category';

@AddMiddleware(AuntheticationMiddleware.auth())
export default class extends RouterBuilder {
  public static override async controller(_req: Request, res: Response) {
    const data = await CategoryService.getAll();
    const code = httpStatus.OK;
    res.status(code).json({
      code,
      message: 'Category retrieved!',
      data,
    });
  }
}
