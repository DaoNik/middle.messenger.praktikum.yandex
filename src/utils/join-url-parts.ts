export const joinUrlParts = (...arguments_: (string | number)[]): string => {
  let result = '';

  for (const [index, argument] of arguments_.entries()) {
    result += String(argument);

    if (
      !String(argument).endsWith('/') &&
      index !== arguments_.length - 1 &&
      !String(arguments_[index + 1]).startsWith('/')
    ) {
      result += '/';
    }
  }

  return result;
};
