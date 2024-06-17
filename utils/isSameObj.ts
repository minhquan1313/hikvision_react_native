interface IParams<T extends object> {
  //
  first: T;
  second: T;
  excludeKeys?: (keyof T)[];
}

export function isSameObj<T extends object>(value: IParams<T>) {
  const { first, second, excludeKeys = [] } = value;

  const result = Object.keys(first).every((k) => {
    const key = k as keyof T;
    if (excludeKeys.includes(key)) return true;

    return first[key] === second[key];
  });

  return result;
}
