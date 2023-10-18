export const joinUrlParts = (...args: (string | number)[]): string => {
  let result = '';

  args.forEach((arg, index) => {
    result += String(arg);

    if (
      !String(arg).endsWith('/') &&
      index !== args.length - 1 &&
      !String(args[index + 1]).startsWith('/')
    ) {
      result += '/';
    }
  });

  return result;
};
