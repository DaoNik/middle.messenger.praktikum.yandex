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

function queryStringify(data: StringIndexed): string | never {
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

  for (let i = 0; i < value.length; i++) {
    const currentValue = value[i];

    if (!isArrayOrObject(currentValue)) {
      result += `${key}[${i}]=${currentValue}`;
    } else if (isArray(currentValue)) {
      result += innerArrayToQueryString(`${key}[${i}]`, currentValue);
    } else {
      result += innerObjectToQueryString(`${key}[${i}]`, currentValue);
    }

    if (i !== value.length - 1) {
      result += '&';
    }
  }

  return result;
}

function innerObjectToQueryString(parentKey: string, obj: PlainObject): string {
  let result = '';
  let index = 0;
  const length = Object.keys(obj).length;

  for (const [key, value] of Object.entries(obj)) {
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

// Author decision
function authorQueryStringify(data: StringIndexed): string | never {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    const value = data[key];
    const endLine = index < keys.length - 1 ? '&' : '';

    if (Array.isArray(value)) {
      const arrayValue = value.reduce<StringIndexed>(
        (result, arrData, index) => ({
          ...result,
          [`${key}[${index}]`]: arrData,
        }),
        {}
      );

      return `${result}${queryStringify(arrayValue)}${endLine}`;
    }

    if (typeof value === 'object') {
      const objValue = Object.keys(value || {}).reduce<StringIndexed>(
        (result, objKey) => ({
          ...result,
          [`${key}[${objKey}]`]: value[objKey],
        }),
        {}
      );

      return `${result}${authorQueryStringify(objValue)}${endLine}`;
    }

    return `${result}${key}=${value}${endLine}`;
  }, '');
}

export default queryStringify;
