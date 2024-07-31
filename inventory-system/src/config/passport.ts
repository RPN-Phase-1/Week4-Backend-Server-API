import { Strategy, ExtractJwt, VerifyCallback, StrategyOptionsWithoutRequest } from 'passport-jwt';
import Config from './config';
import TokenTypes from './tokens';
import Prisma from '../lib/database';

class Passport {
  private static jwtOptions: StrategyOptionsWithoutRequest = {
    secretOrKey: Config.jwt.secret as string,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  private static jwtVerify: VerifyCallback = async (payload, done) => {
    try {
      if (payload.type !== TokenTypes.ACCESS) {
        throw new Error('Invalid token type');
      }
      const user = await Prisma.user.findFirst({ where: { id: payload.sub } });
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  };

  public static jwtStrategy = new Strategy(this.jwtOptions, this.jwtVerify);
}

export default Passport;
