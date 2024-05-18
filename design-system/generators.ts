import { readdir } from 'node:fs/promises';

import { generateCSSVariables, parseTokens } from './token-parser';

const tokens = (
  await readdir(import.meta.dir + '/./tokens', {
    recursive: true,
    withFileTypes: true,
  })
)
  .sort((token) => {
    return token.isDirectory() ? -1 : 1;
  })
  .map((token) => token.name)
  .map((name) => name.split('/'));

const all = await parseTokens(tokens);

const propdir = process.cwd() + '/app/client/public/styles/props.css';

const output = `:root, :host {\n
${generateCSSVariables(all)}
}\n`;

Bun.write(propdir, output);
