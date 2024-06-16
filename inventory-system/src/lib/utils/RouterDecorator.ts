import RouterBuilder from '../models/RouterBuilder';

export function UseAuth(target: typeof RouterBuilder) {
  Reflect.set(target, 'useAuth', true);
}

export function UseParam(target: typeof RouterBuilder) {
  Reflect.set(target, 'useParam', true);
}
