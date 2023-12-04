import { set } from './set.ts';
import { expect } from 'chai';

describe('set', () => {
  it('should correct value', () => {
    expect(typeof set).to.deep.eq('function');
    expect(set(3, 'foo.bar', 'baz')).to.deep.eq(3);
    expect(set({ foo: 5 }, 'bar.baz', 10)).to.deep.eq({
      foo: 5,
      bar: { baz: 10 },
    });
    expect(set({}, 'a', 1)).to.deep.eq({ a: 1 });
    expect(set({ foo: 5, bar: {} }, 'bar.baz', 10)).to.deep.eq({
      foo: 5,
      bar: { baz: 10 },
    });

    expect(set({ foo: 5, bar: { baz: 5 } }, 'bar.baz', 10)).to.deep.eq({
      foo: 5,
      bar: { baz: 10 },
    });
  });
});
