export type PrimitiveT = string | number | boolean | null | undefined;

export function isPrimitive(value: unknown): value is PrimitiveT {
  const type = typeof value;

  return (
    !value ||
    type === 'string' ||
    type === 'number' ||
    type === 'boolean' ||
    type === 'bigint'
  );
}
