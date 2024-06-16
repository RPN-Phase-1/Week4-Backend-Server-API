import express from 'express';
import helmet from 'helmet';
// @ts-expect-error 7016
import xss from 'xss-clean';
// @ts-expect-error 7016
import compression from 'compression';
// @ts-expect-error 7016
import cors from 'cors';
import httpStatus from 'http-status';

import Config from '../config/config';
import Logger from '../config/logger';
import Morgan from '../config/morgan';

import ErrorMiddleware from './middlewares/ErrorMiddleware';
import ApiError from './utils/ApiError';
import WalkRouter from './utils/WalkRouter';

export default class App {
  private static app = express();

  private static port = Config.port;

  public static async registerRouters() {
    Logger.info('Registering routers');
    this.app.get('/', (_req, res) => res.status(200).send('hello world'));

    await WalkRouter.exec(this.app);

    this.app.use((_req, _res, next) => next(new ApiError(httpStatus.NOT_FOUND, 'Not Found')));

    return this;
  }

  public static registerMiddlewares() {
    Logger.info('Registering middlewares');
    if (Config.env !== 'test') {
      this.app.use(Morgan.succesHandler);
      this.app.use(Morgan.errorHandler);
    }

    // url encoded
    this.app.use(express.urlencoded({ extended: true }));

    // Body parser
    this.app.use(express.json());

    // Security
    this.app.use(helmet());

    // saniteze request
    this.app.use(xss());

    // gzip compression
    this.app.use(compression());

    // enable cors
    this.app.use(cors());
    this.app.options('*', cors());

    // error handling
    this.app.use(ErrorMiddleware.errorConverter);
    this.app.use(ErrorMiddleware.errorHandler);

    return this;
  }

  public static connect() {
    this.app.listen(this.port, () => Logger.info(`Connected on port ${this.port}`));
  }
}
