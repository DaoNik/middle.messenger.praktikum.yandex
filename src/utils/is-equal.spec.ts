import { isEqual } from './is-equal.ts';
import { expect } from 'chai';

describe('isEqual', () => {
  it('should return correct value', () => {
    expect(typeof isEqual).to.eq('function');
    expect(isEqual({ a: 1 }, { a: 1 })).to.be.true;
    expect(isEqual({ a: 1 }, { b: 1 })).to.be.false;
    expect(isEqual({ a: 1, b: { a: 1 } }, { a: 1, b: { a: 1 } })).to.be.true;
    expect(isEqual({ a: 1, b: { a: 2 } }, { a: 1, b: { a: 1 } })).to.be.false;
  });
});
