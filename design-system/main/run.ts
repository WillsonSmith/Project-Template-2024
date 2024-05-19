import { readTokensDir, saveFile } from '../utils/fileUtils';
import { reshapeTokens } from '../utils/tokenUtils';

import { generateFiles } from './generate';
import { parseTokens } from './parse';

export async function run(args: string[]): Promise<void> {
  const type = args[2];
  const dir = process.cwd() + '/' + args[3];
  const tokensDir = `${import.meta.dir}/../tokens`;

  const tokens = await readTokensDir(tokensDir);

  switch (type) {
    case 'props':
      await generateProps(dir, tokensDir, tokens);
      break;
    case 'props-split':
      await generateSplitProps(dir, tokensDir, tokens);
      break;
    case 'all-tokens':
      await generateAllTokens(tokensDir, tokens);
      break;
    case 'generate-ts-files':
      await generateTSFiles(dir, tokensDir, tokens);
      break;
    default:
      console.log('No provided type');
  }
}

async function generateProps(
  dir: string,
  tokensDir: string,
  tokens: string[][],
): Promise<void> {
  const allTokens = await parseTokens(tokens, tokensDir);
  const output = `:root, :host {\n${generateCSSVariables(allTokens)}\n}\n`;
  await saveFile(dir, output);
}

async function generateSplitProps(
  dir: string,
  tokensDir: string,
  tokens: string[][],
): Promise<void> {
  const all = await parseTokens(tokens, tokensDir);
  console.log(all);
}

async function generateAllTokens(
  tokensDir: string,
  tokens: string[][],
): Promise<void> {
  const allTokens = await parseTokens(tokens, tokensDir);
  const str = JSON.stringify(allTokens, undefined, 2);
  await saveFile(`${import.meta.dir}/all-tokens.json`, str);
  await saveAllAsTypescript(allTokens);
}

async function generateTSFiles(
  dir: string,
  tokensDir: string,
  tokens: string[][],
): Promise<void> {
  const allTokens = await parseTokens(tokens, tokensDir);
  await generateFiles(allTokens, dir);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function saveAllAsTypescript(allTokens: any): Promise<void> {
  const reshapedTokens = reshapeTokens(allTokens);
  const filePath = `${process.cwd()}/app/client/styles/properties.ts`;
  await saveFile(
    filePath,
    `export const props = ${JSON.stringify(reshapedTokens, undefined, 2)}`,
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function generateCSSVariables(tokens: { [key: string]: any }): string {
  let cssVars = '';
  for (const [group, properties] of Object.entries(tokens)) {
    for (const [name, value] of Object.entries(properties)) {
      cssVars += `--${group}-${name}: ${value};\n`;
    }
  }
  return cssVars;
}
