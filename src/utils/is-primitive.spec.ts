import { expect } from 'chai';
import { isPrimitive } from './is-primitive.ts';

describe('isPrimitive', () => {
  it('should return correct type', () => {
    expect(isPrimitive('')).to.be.true;
    expect(isPrimitive([])).to.be.false;
    expect(isPrimitive(0)).to.be.true;
    expect(isPrimitive(function () {})).to.be.false;
    expect(isPrimitive(new Map())).to.be.false;
  });
});
