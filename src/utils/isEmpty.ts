export function isEmpty(value: any): boolean {
  if (!value) return true;

  if (
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'function'
  ) {
    return true;
  }

  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    if (value.keys) {
      return [...value].length === 0;
    }

    return Object.keys(value).length === 0;
  }

  return false;
}
