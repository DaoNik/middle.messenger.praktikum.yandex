import { isEqual } from './isEqual.ts';

describe('isEqual', () => {
  it('should return correct value', () => {
    expect(typeof isEqual).toBe('function');
    expect(isEqual({ a: 1 }, { a: 1 })).toBe(true);
    expect(isEqual({ a: 1 }, { b: 1 })).toBe(false);
    expect(isEqual({ a: 1, b: { a: 1 } }, { a: 1, b: { a: 1 } })).toBe(true);
    expect(isEqual({ a: 1, b: { a: 2 } }, { a: 1, b: { a: 1 } })).toBe(false);
  });
});
