import { merge } from './merge';
import { Indexed } from '../types.ts';

export function set(
  object: Indexed | unknown,
  path: string,
  value: any
): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  // eslint-disable-next-line unicorn/no-array-reduce
  const result = path.split('.').reduceRight<Indexed>(
    (accumulator, key) => ({
      [key]: accumulator,
    }),
    value
  );
  return merge(object as Indexed, result);
}
