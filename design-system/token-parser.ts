import { readdir } from 'node:fs/promises';

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

export async function parseTokens(arrays: string[][]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          const file = Bun.file(
            import.meta.dir + '/./tokens/' + path.join('/'),
          );
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

export async function parseTokensAsGroups(arrays: string[][]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          const filePath = `${import.meta.dir}/tokens/${path.join('/')}`;
          const file = Bun.file(filePath);
          const fileContents = JSON.parse(await file.text());

          // Add the file contents directly to the result object with the file path as the key
          result[filePath] = fileContents;
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

export function generateCSSVariables(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: { [key: string]: any },
  parentKey = '',
) {
  let cssVariables = '';

  for (const key in obj) {
    if (obj[key]) {
      const currentKey = parentKey ? `${parentKey}-${key}` : key;
      const valueObj = obj[key];

      if (valueObj && typeof valueObj === 'object' && !valueObj.$value) {
        cssVariables += generateCSSVariables(valueObj, currentKey);
      } else if (valueObj && valueObj.$value) {
        cssVariables += `--${currentKey}: ${valueObj.$value};\n`;
      }
    }
  }
  return cssVariables;
}

export async function writeAllTokens() {
  const allTokens = await parseTokens(tokens);
  const str = JSON.stringify(allTokens, undefined, 2);
  await Bun.write(import.meta.dir + '/all-tokens.json', str);
}
