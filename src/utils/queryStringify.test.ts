import { queryStringify } from './queryStringify.ts';

describe('queryStringify', () => {
  it('should return correct value', () => {
    expect(queryStringify({})).toBe('');
    expect(queryStringify({ a: 1 })).toBe('a=1');
    expect(queryStringify({ a: 1, b: 2 })).toBe('a=1&b=2');

    const object = {
      key: 1,
      key2: 'test',
      key3: false,
      key4: true,
      key5: [1, 2, 3],
      key6: { a: 1 },
      key7: { b: { d: 2 } },
    };

    expect(queryStringify(object)).toBe(
      'key=1&key2=test&key3=false&key4=true&key5[0]=1&key5[1]=2&key5[2]=3&key6[a]=1&key7[b][d]=2'
    );
  });
});
