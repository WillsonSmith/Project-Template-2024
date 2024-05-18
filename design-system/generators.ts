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
  switch (type) {
    case 'props':
      await generateProps(process.cwd() + '/' + args[3]);
      break;
    default:
      // runDefault();
      console.log('No provided type');
  }
}

await run(args);
export async function generateProps(
  dir = process.cwd() + '/app/client/public/styles/props.css',
) {
  const all = await parseTokens(tokens);
  const output = `:root, :host {\n
${generateCSSVariables(all)}
}\n`;

  Bun.write(dir, output);
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
