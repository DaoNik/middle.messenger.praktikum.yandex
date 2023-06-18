const { Transformer } = require('@parcel/plugin');
const { compile } = require('src/libs/bubbles');

module.exports = new Transformer({
  async transform({ asset }) {
    const source = await asset.getCode();

    const code = compile(source);
    asset.setCode(code);

    return [asset];
  },
});
