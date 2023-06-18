const fs = require('fs');

function template(code) {
  const keys = code.match(/{{>.*}}/gm);
  let result = code;

  if (!keys || keys.length === 0) {
    return result;
  }

  keys
    .map((key) => key.slice(3, key.length - 2))
    .forEach((key) => {
      const file = fs.readFileSync(`${__dirname}/../../${key}`, 'utf8');
      const regExp = new RegExp(`{{>${key}}}`, 'gm');
      result = result.replace(regExp, file);
    });

  return result;
}

function compile(code) {
  return template(code);
}

module.exports = { compile };
