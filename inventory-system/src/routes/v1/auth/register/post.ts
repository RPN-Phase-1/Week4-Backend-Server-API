import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import RouterBuilder from '../../../../lib/models/RouterBuilder';
import UserService from '../../../../services/user';
import ApiError from '../../../../lib/utils/ApiError';
import TokenService from '../../../../services/generateToken';

export default class extends RouterBuilder {
  public static override async controller(req: Request, res: Response) {
    const existing = await UserService.getEmail(req.body.email);
    if (existing) throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken!');

    const created = await UserService.create(req.body);
    const tokens = await TokenService.generateAuth(created);
    const code = httpStatus.CREATED;
    res.status(code).json({
      code,
      message: 'User Created!',
      data: {
        user: created,
        tokens,
      },
    });
  }
}
