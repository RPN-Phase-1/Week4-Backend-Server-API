import RouterBuilder from '../../../lib/models/RouterBuilder';
import type { Request, Response } from 'express';

export default class UserGet extends RouterBuilder {
  public static override async controller(_req: Request, res: Response) {
    res.status(200).send('woy');
  }
}
