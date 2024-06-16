import process from 'node:process';

import App from './lib/app';
import Logger from './config/logger';
import Database from './lib/database';

const main = async () => {
  if (Database) {
    Logger.info('Connected to database');

    const server = await App.registerMiddlewares()
      .registerRouters()
      .then((x) => x.connect());

    const closeServer = () => {
      if (server) {
        server.close(() => {
          Logger.info('Server Closed');
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    };
    process.on('uncaughtException', (error) => {
      Logger.error(error);
      closeServer();
    });
    process.on('unhandledRejection', (error) => {
      closeServer();
      Logger.error(error);
    });
    process.on('SIGTERM', () => {
      Logger.info('SIGTERM Received');
      if (server) server.close();
    });
  }
};

main();
