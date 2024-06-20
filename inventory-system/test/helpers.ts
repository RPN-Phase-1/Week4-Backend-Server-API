// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';
import App from '../src/lib/app';

App.registerMiddlewares();
// eslint-disable-next-line import/prefer-default-export
export const supertest = App.registerRouters().then((x) => request(x.app));
