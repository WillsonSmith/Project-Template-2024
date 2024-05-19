/* eslint-disable prefer-const */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { readdir } from 'node:fs/promises';

import { generateCSSVariables, parseTokens } from './token-parser';

const args = process.argv;

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

async function run(args: string[]) {
  const type = args[2];
  const dir = process.cwd() + '/' + args[3];
  switch (type) {
    case 'props':
      await generateProps(dir);
      break;
    case 'props-split':
      await generateSplitProps(dir);
      break;
    case 'all-tokens':
      await generateAllTokens();
      break;
    default:
      // runDefault();
      console.log('No provided type');
  }
}

await run(args);

async function generateSplitProps(dir: string) {
  const all = await parseTokens(tokens);
  let groups = [];
  // console.log(Object.entries(all));
  for (const [key, values] of Object.entries(all)) {
    console.log(generateCSSVariables(Object.fromEntries([[key, values]])));
    console.log('__________');
  }
}

export async function generateProps(
  dir = process.cwd() + '/app/client/public/styles/props.css',
) {
  const all = await parseTokens(tokens);
  const output = `:root, :host {\n
${generateCSSVariables(all)}
}\n`;

  Bun.write(dir, output);
}

async function generateAllTokens() {
  const allTokens = await parseTokens(tokens);
  const str = JSON.stringify(allTokens, undefined, 2);
  await Bun.write(import.meta.dir + '/all-tokens.json', str);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function runDefault() {
  const t = await parseTokens(tokens);
  const e = Object.entries(t);
  for (const tokenSet of e) {
    const toWorkWith = Object.fromEntries([tokenSet]);
    console.log(generateCSSVariables(toWorkWith));
  }
}
