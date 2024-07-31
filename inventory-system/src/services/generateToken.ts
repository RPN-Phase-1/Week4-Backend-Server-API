import jwt from 'jsonwebtoken';
import moment from 'moment';
import httpStatus from 'http-status';
import Config from '../config/config';
import prisma from '../lib/database';
import ApiError from '../lib/utils/ApiError';
import TokenTypes from '../config/tokens';

export default class TokenService {
  public static generate(userId: string, expires: moment.Moment, type: string, secret = Config.jwt.secret) {
    return jwt.sign(
      {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type,
      } as object,
      secret as string
    );
  }

  public static save(token: string, userId: string, expires: moment.Moment, type: string, blacklisted = false) {
    return prisma.token.create({
      data: {
        token,
        userId,
        expires: expires.toDate(),
        type,
        blacklisted,
      },
    });
  }

  public static async verify(token: string, type: string) {
    const payload = jwt.verify(token, Config.jwt.secret as string);
    const data = await prisma.token.findFirst({
      where: {
        token,
        type,
        userId: payload.sub as string,
        blacklisted: false,
      },
    });
    if (!data) throw new ApiError(httpStatus.UNAUTHORIZED, 'Token not found');
    return data;
  }

  public static async generateAuth(user: object) {
    const id = Reflect.get(user, 'id');

    const accesTokenExpires = moment().add(Config.jwt.accessExpirationMinutes, 'minute');
    const accesToken = this.generate(id, accesTokenExpires, TokenTypes.ACCESS);

    const refreshTokenExpires = moment().add(Config.jwt.refreshExpirationDay, 'day');
    const refreshToken = this.generate(id, refreshTokenExpires, TokenTypes.REFRESH);
    await this.save(refreshToken, id, refreshTokenExpires, TokenTypes.REFRESH);

    return {
      access: { token: accesToken, expires: accesTokenExpires.toDate() },
      refresh: { token: refreshToken, expires: refreshTokenExpires.toDate() },
    };
  }
}
