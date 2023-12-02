const { JSDOM } = require('jsdom');

const { window } = new JSDOM('<main id="root"></main>', {
  url: 'http://localhost:5173'
});

global.Window = window.Window;
global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;

// require.extensions['.hbs'] = function (module, filename) {
//   const contents = fs.readFileSync(filename, 'utf-8');

//   module.exports = Handlebars.compile(contents);
// }

require.extensions['.pcss'] = function () {
  module.exports = () => ({});
}
