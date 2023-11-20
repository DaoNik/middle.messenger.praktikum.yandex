import { set } from './set.ts';

describe('set', () => {
  it('should correct value', () => {
    expect(typeof set).toBe('function');
    expect(set(3, 'foo.bar', 'baz')).toBe(3);
    expect(set({ foo: 5 }, 'bar.baz', 10)).toEqual({
      foo: 5,
      bar: { baz: 10 },
    });
    expect(set({}, 'a', 1)).toEqual({ a: 1 });
    expect(set({ foo: 5, bar: {} }, 'bar.baz', 10)).toEqual({
      foo: 5,
      bar: { baz: 10 },
    });

    expect(set({ foo: 5, bar: { baz: 5 } }, 'bar.baz', 10)).toEqual({
      foo: 5,
      bar: { baz: 10 },
    });
  });
});
