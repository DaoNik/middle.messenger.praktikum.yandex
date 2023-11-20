import { Indexed, merge } from './merge';

export function set(
  object: Indexed | unknown,
  path: string,
  value: any
): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value
  );
  return merge(object as Indexed, result);
}
