import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/dist`));

app.get('*', (req, res) => {
  res.sendFile(`./dist/index.html`, { root: __dirname });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
