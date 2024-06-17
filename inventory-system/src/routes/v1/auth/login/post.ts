import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import RouterBuilder from '../../../../lib/models/RouterBuilder';
import TokenService from '../../../../services/generateToken';
import AuthService from '../../../../services/auth';

export default class extends RouterBuilder {
  public static override async controller(req: Request, res: Response) {
    const user = await AuthService.login(req.body.email, req.body.password);
    const tokens = await TokenService.generateAuth(user);
    const code = httpStatus.CREATED;
    res.status(code).json({
      code,
      message: 'User Login!',
      data: {
        user,
        tokens,
      },
    });
  }
}
