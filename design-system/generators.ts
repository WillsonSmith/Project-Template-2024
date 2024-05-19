/* eslint-disable */

/* eslint-disable @typescript/elsint */

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

const t = await parseTokens(tokens);
const path = process.cwd() + '/app/client/styles/properties.ts';

// @ts-expect-error lol
function reshapeTokens(obj) {
  const result = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const valueObj = obj[key];

      if (
        valueObj &&
        typeof valueObj === 'object' &&
        !Array.isArray(valueObj)
      ) {
        // If the object contains a $value property, assign the value directly
        if ('$value' in valueObj) {
          // @ts-expect-error lol
          result[key] = valueObj.$value;
        } else {
          // Recursively reshape nested objects
          // @ts-expect-error lol
          result[key] = reshapeTokens(valueObj);
        }
      } else {
        // @ts-expect-error lol
        result[key] = valueObj;
      }
    }
  }

  return result;
}
Bun.write(
  path,
  `export const props = ${JSON.stringify(reshapeTokens(t), undefined, 2)}`,
);

async function generateSplitProps(dir: string) {
  const all = await parseTokens(tokens);

  let groups = [];
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
