import RouterBuilder from '../models/RouterBuilder';

export function UseParam(target: typeof RouterBuilder) {
  Reflect.set(target, 'useParam', true);
}

export function DeclareMethod(method: 'get' | 'post' | 'put' | 'delete') {
  return function (target: typeof RouterBuilder) {
    Reflect.set(target, 'declareMethod', method);
  };
}

export function AddMiddleware(...middleware: typeof RouterBuilder.middlewares) {
  return function (target: typeof RouterBuilder) {
    target.middlewares.push(...middleware);
  };
}
