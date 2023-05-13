const fs = require('fs');

function template(path) {
  const stringTmpl = fs.readFileSync(`${path}`, 'utf8');

  const keys = stringTmpl.match(/{{>.*}}/gm);
  let result = stringTmpl;

  const newPath = path.replace('.html', '.template.html');

  if (!keys || keys.length === 0) {
    fs.writeFile(`${newPath}`, result, 'utf8', () => {});
    return;
  }

  keys
    .map(key => key.slice(3, key.length - 2))
    .forEach((key) => {
      const file = fs.readFileSync(`${__dirname}${key}`, 'utf8');
      const regExp = new RegExp(`{{>${key}}}`, 'gm')
      result = result.replace(regExp, file);
    });

  fs.writeFile(`${newPath}`, result, 'utf8', () => {});

  return result;
}

fs.promises.readdir(`${__dirname}/pages`).then(directories => {
  for (const directory of directories) {
    if (directory.indexOf('.html') !== -1 && directory.indexOf('.template.html') === -1) {
      template(directory);
    } else if (!directory.match(/.+\..+/)) {
      fs.promises.readdir(`${__dirname}/pages/${directory}`).then(files => {
        for (const file of files) {
          if (file.indexOf('.html') !== -1 && file.indexOf('.template.html') === -1) {
            template(`${__dirname}/pages/${directory}/${file}`);
          }
        }
      })
    }
  }
})

template(`${__dirname}/main.html`);

module.exports = template;
