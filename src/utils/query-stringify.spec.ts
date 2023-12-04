import { queryStringify } from './query-stringify.ts';
import { expect } from 'chai';

describe('queryStringify', () => {
  it('should return correct value', () => {
    expect(queryStringify({})).to.eq('');
    expect(queryStringify({ a: 1 })).to.eq('a=1');
    expect(queryStringify({ a: 1, b: 2 })).to.eq('a=1&b=2');

    const object = {
      key: 1,
      key2: 'test',
      key3: false,
      key4: true,
      key5: [1, 2, 3],
      key6: { a: 1 },
      key7: { b: { d: 2 } },
    };

    expect(queryStringify(object)).to.eq(
      'key=1&key2=test&key3=false&key4=true&key5[0]=1&key5[1]=2&key5[2]=3&key6[a]=1&key7[b][d]=2'
    );
  });
});
