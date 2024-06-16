import { opendir } from 'node:fs/promises';
import { join } from 'path';
import { Router } from 'express';

import Logger from '../../config/logger';
import Config from '../../config/config';
import RouterBuilder from '../models/RouterBuilder';

export default class WalkRouter {
  public static async exec(router: Router, path: string = Config.routesPath) {
    const dirs = await opendir(path);
    /* eslint-disable-next-line no-restricted-syntax */
    for await (const item of dirs) {
      if (item.isFile()) {
        const route = path.replace(Config.routesPath, '').replace(/\\/g, '/').padStart(1, '/');

        const method = item.name.replace(/(\.ts|\.js|\.mjs)$/, '');

        if (['get', 'post', 'put', 'delete'].includes(method)) {
          const joined = join(path, item.name);
          /* eslint-disable-next-line */
          const imported = require(joined);
          Logger.info(`register route '${route}' with method '${method}'`);
          router[method as 'get'](route, (imported.default as typeof RouterBuilder).controller);
        }
      } else if (item.isDirectory()) {
        await this.exec(router, join(path, item.name));
      }
    }
  }
}
