import { merge } from './merge.ts';

describe('merge', () => {
  it('should correctly merge', () => {
    expect(merge({}, {})).toEqual({});
    expect(merge({ a: 1 }, {})).toEqual({ a: 1 });
    expect(merge({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
    expect(merge({ a: 2 }, { b: 2 })).toEqual({ a: 2, b: 2 });
    expect(merge({ a: { b: { a: 2 } }, d: 5 }, { a: { b: { c: 1 } } })).toEqual(
      { a: { b: { a: 2, c: 1 } }, d: 5 }
    );
  });
});
