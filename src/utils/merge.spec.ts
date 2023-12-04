import { merge } from './merge.ts';
import { expect } from 'chai';

describe('merge', () => {
  it('should correctly merge', () => {
    expect(merge({}, {})).to.deep.eq({});
    expect(merge({ a: 1 }, {})).to.deep.eq({ a: 1 });
    expect(merge({ a: 1 }, { a: 2 })).to.deep.eq({ a: 2 });
    expect(merge({ a: 2 }, { b: 2 })).to.deep.eq({ a: 2, b: 2 });
    expect(
      merge({ a: { b: { a: 2 } }, d: 5 }, { a: { b: { c: 1 } } })
    ).to.deep.eq({
      a: { b: { a: 2, c: 1 } },
      d: 5,
    });
  });
});
