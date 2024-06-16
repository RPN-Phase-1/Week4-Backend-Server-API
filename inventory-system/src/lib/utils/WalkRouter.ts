import { opendir } from 'node:fs/promises';
import { join } from 'path';
import { Router } from 'express';

import Logger from '../../config/logger';
import Config from '../../config/config';
import RouterBuilder from '../models/RouterBuilder';
import catchAsync from './CatchAsync';

export default class WalkRouter {
  public static async exec(router: Router, path: string = Config.routesPath, parent = '') {
    const dirs = await opendir(path);
    /* eslint-disable-next-line no-restricted-syntax */
    for await (const item of dirs) {
      if (item.isFile()) {
        let route = path.replace(Config.routesPath, '').replace(/\\/g, '/').padStart(1, '/');

        const method = item.name.replace(/(\.ts|\.js|\.mjs)$/, '');

        if (['get', 'post', 'put', 'delete'].includes(method)) {
          const joined = join(path, item.name);
          /* eslint-disable-next-line */
          const imported: typeof RouterBuilder = require(joined).default;

          if (imported.useParam) route = route.replace(`/${parent}`, `/:${parent}`);

          const middlewares: ReturnType<typeof catchAsync>[] = [];

          if (imported.useAuth) middlewares.push(catchAsync(imported.authentication));
          middlewares.push(catchAsync(imported.controller));

          router[method as 'get'](route, ...middlewares);
          Logger.info(`register route '${route}' with method '${method}'`);
        }
      } else if (item.isDirectory()) {
        await this.exec(router, join(path, item.name), item.name);
      }
    }
  }
}
