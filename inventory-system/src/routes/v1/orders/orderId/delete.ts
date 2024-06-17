import type { Request, Response } from 'express';
import RouterBuilder from '../../../../lib/models/RouterBuilder';
import { UseAuth, UseParam } from '../../../../lib/utils/RouterDecorator';

@UseAuth
@UseParam
export default class extends RouterBuilder {
  public static override async controller(_req: Request, res: Response) {
    res.status(200).send('woy');
  }
}
