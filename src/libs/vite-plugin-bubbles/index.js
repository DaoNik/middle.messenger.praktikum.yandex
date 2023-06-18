const { compile } = require('src/libs/bubbles');

function vitePluginBubbles() {
  return {
    name: 'vite-plugin-bubbles',
    transformIndexHtml: {
      enforce: 'pre',

      transform(html) {
        return compile(html);
      },
    },
  };
}

module.exports = vitePluginBubbles;
