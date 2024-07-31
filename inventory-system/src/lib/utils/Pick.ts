function pick<T extends object, K extends (keyof T)[]>(object: T, keys: K) {
  const results = {};
  keys.forEach((key) => {
    const value = Reflect.get(object, key, results);
    if (value) Reflect.set(results, key, value);
  });
  return results as {
    [k in K[number]]: T[k];
  };
}

export default pick;
