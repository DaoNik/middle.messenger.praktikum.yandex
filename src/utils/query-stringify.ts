type StringIndexed = Record<string, any>;

type PlainObject<T = any> = {
  [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

export function queryStringify(data: StringIndexed): string | never {
  if (!isPlainObject(data)) {
    throw new Error('input must be an object');
  }

  const length = Object.keys(data).length;
  let result = '';
  let index = 0;

  for (const [key, value] of Object.entries(data)) {
    if (!isArrayOrObject(value)) {
      result += `${key}=${value}`;
    } else if (isArray(value)) {
      result += innerArrayToQueryString(key, value);
    } else {
      result += innerObjectToQueryString(key, value);
    }

    if (index !== length - 1) {
      result += '&';
    }

    index++;
  }

  return result;
}

function innerArrayToQueryString(key: string, value: []): string {
  let result = '';

  for (let index = 0; index < value.length; index++) {
    const currentValue = value[index];

    if (!isArrayOrObject(currentValue)) {
      result += `${key}[${index}]=${currentValue}`;
    } else if (isArray(currentValue)) {
      result += innerArrayToQueryString(`${key}[${index}]`, currentValue);
    } else {
      result += innerObjectToQueryString(`${key}[${index}]`, currentValue);
    }

    if (index !== value.length - 1) {
      result += '&';
    }
  }

  return result;
}

function innerObjectToQueryString(
  parentKey: string,
  object: PlainObject
): string {
  let result = '';
  let index = 0;
  const length = Object.keys(object).length;

  for (const [key, value] of Object.entries(object)) {
    if (!isArrayOrObject(value)) {
      result += `${parentKey}[${key}]=${value}`;
    } else if (isArray(value)) {
      result += innerArrayToQueryString(`${parentKey}[${key}]`, value);
    } else {
      result += innerObjectToQueryString(`${parentKey}[${key}]`, value);
    }

    if (index !== length - 1) {
      result += '&';
    }

    index++;
  }

  return result;
}
