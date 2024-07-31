import express from 'express';
import helmet from 'helmet';
// @ts-expect-error 7016
import xss from 'xss-clean';
// @ts-expect-error 7016
import compression from 'compression';
// @ts-expect-error 7016
import cors from 'cors';
import passport from 'passport';
import httpStatus from 'http-status';

import Config from '../config/config';
import Logger from '../config/logger';
import Morgan from '../config/morgan';
import Passport from '../config/passport';

import ErrorMiddleware from './middlewares/ErrorMiddleware';
import ApiError from './utils/ApiError';
import WalkRouter from './utils/WalkRouter';

export default class App {
  public static app = express();

  private static port = Config.port;

  public static async registerRouters() {
    if (Config.env !== 'test') Logger.info('Registering routers');
    this.app.get('/', (_req, res) => res.send('hello world'));

    await WalkRouter.exec(this.app);

    this.app.use((_req, _res, next) => next(new ApiError(httpStatus.NOT_FOUND, 'Not Found')));

    // error handling
    this.app.use(ErrorMiddleware.errorConverter);
    this.app.use(ErrorMiddleware.errorHandler);

    return this;
  }

  public static registerMiddlewares() {
    if (Config.env !== 'test') {
      Logger.info('Registering middlewares');
      this.app.use(Morgan.succesHandler);
      this.app.use(Morgan.errorHandler);
    }

    // Body parser
    this.app.use(express.json());

    // Security
    this.app.use(helmet());

    // url encoded
    this.app.use(express.urlencoded({ extended: true }));

    // saniteze request
    this.app.use(xss());

    // gzip compression
    this.app.use(compression());

    // enable cors
    this.app.use(cors());
    this.app.options('*', cors());

    this.app.use(passport.initialize());
    passport.use('jwt', Passport.jwtStrategy);
    return this;
  }

  public static connect() {
    return this.app.listen(this.port, () => Logger.info(`Connected on port ${this.port}`));
  }
}
