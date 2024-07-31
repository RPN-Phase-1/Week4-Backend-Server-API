import morgan from 'morgan';
import Config from './config';
import Logger from './logger';

// @ts-expect-error 2339
morgan.token('message', (_req, res) => res.locals.errorMessage || '');

export default class Morgan {
  private static get ipFormat() {
    return Config.env === 'production' ? ':remote-addr - ' : '';
  }

  private static get succesResponseFormat() {
    return `${this.ipFormat}:method :url :status - :response-time ms`;
  }

  private static get errorResponseFormat() {
    return `${this.ipFormat}:method :url :status - :response-time ms - message: :message`;
  }

  public static succesHandler = morgan(this.succesResponseFormat, {
    skip: (_req, res) => res.statusCode >= 400,
    stream: { write: (message) => Logger.info(message) },
  });

  public static errorHandler = morgan(this.errorResponseFormat, {
    skip: (_req, res) => res.statusCode < 400,
    stream: { write: (message) => Logger.error(message) },
  });
}
