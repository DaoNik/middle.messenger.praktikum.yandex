export type Indexed<T = any> = {
  [key in string]: T;
};

export const isObject = (value: unknown): value is Indexed => {
  return typeof value === 'object' && value !== null;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  const result: Indexed = {};
  const keys = [...Object.keys(lhs), ...Object.keys(rhs)];

  for (const key of keys) {
    const leftValue = lhs[key];
    const rightValue = rhs[key];

    if (leftValue && !isObject(leftValue)) {
      result[key] = leftValue;
    }

    if (rightValue && !isObject(rightValue)) {
      result[key] = rightValue;
    }

    if (isObject(leftValue) && isObject(rightValue)) {
      result[key] = merge(leftValue, rightValue);
    } else if (isObject(leftValue)) {
      result[key] = merge(leftValue, {});
    } else if (isObject(rightValue)) {
      result[key] = merge({}, rightValue);
    }
  }

  return result;
}
