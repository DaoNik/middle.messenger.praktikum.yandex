const fs = require('fs');

const stringTmpl = fs.readFileSync(`${__dirname}/index.html`, 'utf8');

// const regExp = new RegExp(/{{.*}}/gm);
// const keys = stringTmpl.match(regExp);
// const values = stringTmpl.match(/--- templater ---.*/gms)
// console.log(values);
// const map = new Map();
// keys
//   .map(key => key.slice(2, key.length - 2))
//   .forEach((key) => {
//     const keyValue = values[0].match(key);
//     console.log(keyValue);
//   });

const keys = stringTmpl.match(/{{>.*}}/gm);
let result = stringTmpl;
keys
  .map(key => key.slice(3, key.length - 2))
  .forEach((key) => {
    const file = fs.readFileSync(`${__dirname}${key}`, 'utf8');
    const regExp = new RegExp(`{{>${key}}}`, 'gm')
    result = result.replace(regExp, file);
  });

fs.writeFile(`${__dirname}/result.html`, result, 'utf8', () => {});
