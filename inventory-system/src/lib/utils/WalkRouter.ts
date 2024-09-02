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
    const awaited = [] as Promise<void>[];
    /* eslint-disable-next-line no-restricted-syntax */
    for await (const item of dirs) {
      if (item.isFile() && (item.name.endsWith('.ts') || item.name.endsWith('.js'))) {
        let route = path.replace(Config.routesPath, '').replace(/\\/g, '/').padStart(1, '/');

        let method = item.name.replace(/(\.ts|\.js|\.mjs)$/, '');

        const joined = join(path, item.name);
        try {
          /* eslint-disable-next-line */
          const imported: typeof RouterBuilder = require(joined).default;

          if (imported.useParam) route = route.replace(`/${parent}`, `/:${parent}`);

          if (!['get', 'post', 'put', 'delete'].includes(method)) {
            route += `/${method}`;
            method = imported.declareMethod ?? 'all';
          }

          const middlewares: ReturnType<typeof catchAsync>[] = [];

          if (imported.middlewares.length) middlewares.push(...imported.middlewares);
          middlewares.push(catchAsync(imported.controller));

          router[method as 'get'](route, ...middlewares);
          imported.middlewares = [];
          if (Config.env === 'development')
            Logger.info(`register route '${route}' with method '${method}' with ${middlewares.length - 1} middlewares`);
        } catch (error) {
          if (Config.env === 'development')
            Logger.error(`register route '${route}' with method '${method}' failed cause ${(error as Error).message}`);
        }
      } else if (item.isDirectory()) {
        awaited.push(this.exec(router, join(path, item.name), item.name));
      }
    }
    await Promise.all(awaited);
  }
}
