import App from './lib/app';

App.registerMiddlewares()
  .registerRouters()
  .then((x) => x.connect());
