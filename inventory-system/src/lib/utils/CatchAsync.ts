import { Request, Response, NextFunction } from 'express';

function catchAsync<Req extends Request, Res extends Response, Next extends NextFunction>(
  callbackfn: (req: Req, res: Res, next: Next) => unknown
) {
  return function (req: Req, res: Res, next: Next) {
    Promise.resolve(callbackfn(req, res, next)).catch((err) => next(err));
  };
}

export default catchAsync;
