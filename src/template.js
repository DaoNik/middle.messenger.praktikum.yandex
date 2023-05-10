const fs = require('fs');

const stringTmpl = fs.readFileSync(`${__dirname}/main.html`, 'utf8');

const keys = stringTmpl.match(/{{>.*}}/gm);
let result = stringTmpl;
keys
  .map(key => key.slice(3, key.length - 2))
  .forEach((key) => {
    const file = fs.readFileSync(`${__dirname}${key}`, 'utf8');
    const regExp = new RegExp(`{{>${key}}}`, 'gm')
    result = result.replace(regExp, file);
  });

fs.writeFile(`${__dirname}/index.html`, result, 'utf8', () => {});
