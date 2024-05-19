/* eslint-disable */

/* eslint-disable @typescript/elsint */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { readdir } from 'node:fs/promises';
import { appendFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const args = process.argv;

const tokens = (
  await readdir(`${import.meta.dir}/tokens`, {
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
    case 'generate-ts-files':
      await generateTSFiles(dir);
      break;
    default:
      console.log('No provided type');
  }
}

await run(args);

async function saveAllAsTypescript() {
  const t = await parseTokens(tokens);
  const filePath = path.join(process.cwd(), '/app/client/styles/properties.ts');

  const reshapedTokens = reshapeTokens(t);

  await writeFile(
    filePath,
    `export const props = ${JSON.stringify(reshapedTokens, undefined, 2)}`,
  );
}

async function generateSplitProps(dir: string) {
  const all = await parseTokensAsGroups(tokens);
  console.log(all);
}

export async function generateProps(
  dir = path.join(process.cwd(), '/app/client/public/styles/props.css'),
) {
  const all = await parseTokens(tokens);
  const output = `:root, :host {\n${generateCSSVariables(all)}\n}\n`;

  await writeFile(dir, output);
}

async function generateAllTokens() {
  const allTokens = await parseTokens(tokens);
  const str = JSON.stringify(allTokens, undefined, 2);
  await writeFile(path.join(import.meta.dir, '/all-tokens.json'), str);
  await saveAllAsTypescript();
}

async function generateTSFiles(baseDir: string) {
  const allTokens = await parseTokens(tokens);

  await mkdir(baseDir, { recursive: true });
  await generateFiles(allTokens, baseDir);
}

async function generateFiles(obj: any, dir: string) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const camelCaseKey = toCamelCase(key);
      const value = obj[key];

      if (typeof value === 'object' && !Array.isArray(value)) {
        if (key === 'color') {
          const colorDir = `${dir}/color`;
          await mkdir(colorDir, { recursive: true });

          for (const color in value) {
            if (value.hasOwnProperty(color)) {
              const colorValue = reshapeTokens(value[color]);
              const colorCamelCase = toCamelCase(color);
              const colorFilePath = `${colorDir}/${colorCamelCase}.ts`;
              const colorContent = `export const ${colorCamelCase} = ${JSON.stringify(
                colorValue,
                null,
                2,
              )};\n`;
              await writeFile(colorFilePath, colorContent);

              // Update color index file
              const colorIndexPath = `${colorDir}/index.ts`;
              const importPath = `./${colorCamelCase}`;
              const exportContent = `export { ${colorCamelCase} } from '${importPath}';\n`;
              await appendFile(colorIndexPath, exportContent);
            }
          }

          // Update main index file
          const mainIndexPath = `${dir}/index.ts`;
          const mainImportPath = `./color`;
          const mainExportContent = `export * from '${mainImportPath}';\n`;
          await appendFile(mainIndexPath, mainExportContent);
        } else {
          const reshapedValue = reshapeTokens(value);
          const content = `export const ${camelCaseKey} = ${JSON.stringify(
            reshapedValue,
            null,
            2,
          )};\n`;
          const filePath = `${dir}/${camelCaseKey}.ts`;
          await writeFile(filePath, content);

          // Update main index file
          const mainIndexPath = `${dir}/index.ts`;
          const importPath = `./${camelCaseKey}`;
          const exportContent = `export { ${camelCaseKey} } from '${importPath}';\n`;
          await appendFile(mainIndexPath, exportContent);
        }
      }
    }
  }
}

function toCamelCase(str: string) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

function reshapeTokens(obj: any) {
  const result: any = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const valueObj = obj[key];

      if (
        valueObj &&
        typeof valueObj === 'object' &&
        !Array.isArray(valueObj)
      ) {
        if ('$value' in valueObj) {
          result[toCamelCase(key)] = valueObj.$value;
        } else {
          result[toCamelCase(key)] = reshapeTokens(valueObj);
        }
      } else {
        result[toCamelCase(key)] = valueObj;
      }
    }
  }

  return result;
}

async function parseTokens(arrays: string[][]) {
  const result: { [key: string]: any } = {};
  for (const path of arrays) {
    let current = result;

    for (let i = 0; i < path.length; i++) {
      const key = path[i];
      if (i === path.length - 1) {
        const fileName = key;
        const propertyName = fileName.replace('.json', '');
        if (!fileName.endsWith('.json')) {
          current[propertyName] = {};
        } else {
          const file = Bun.file(`${import.meta.dir}/tokens/${path.join('/')}`);
          current[propertyName] = JSON.parse(await file.text());
        }
      } else {
        if (!current[key]) {
          current[key] = {};
        }
        current = current[key];
      }
    }
  }
  return result;
}

async function parseTokensAsGroups(arrays: string[][]) {
  const result: { [key: string]: any } = {};
  for (const path of arrays) {
    let current = result;

    for (let i = 0; i < path.length; i++) {
      const key = path[i];
      if (i === path.length - 1) {
        const fileName = key;
        const propertyName = fileName.replace('.json', '');
        if (!fileName.endsWith('.json')) {
          current[propertyName] = {};
        } else {
          const file = Bun.file(`${import.meta.dir}/tokens/${path.join('/')}`);
          current[propertyName] = JSON.parse(await file.text());
        }
      } else {
        if (!current[key]) {
          current[key] = {};
        }
        current = current[key];
      }
    }
  }
  return result;
}

function generateCSSVariables(tokens: { [key: string]: any }) {
  let cssVars = '';
  for (const [group, properties] of Object.entries(tokens)) {
    for (const [name, value] of Object.entries(properties)) {
      cssVars += `--${group}-${name}: ${value};\n`;
    }
  }
  return cssVars;
}
