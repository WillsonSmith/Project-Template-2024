/* eslint-disable @typescript-eslint/no-explicit-any */
import { appendFile, mkdir, readFile, readdir, writeFile } from 'fs/promises';
import path from 'path';

interface Token {
  [key: string]: {
    $value: string | number;
    $type: string;
  };
}

async function readJSONFile(filePath: string): Promise<Token> {
  const fileContent = await readFile(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

async function readTokensDir(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const res = path.resolve(dir, entry.name);
      return entry.isDirectory() ? readTokensDir(res) : [res];
    }),
  );
  return Array.prototype.concat(...files);
}

function transformValuesToCSSVars(parentKey: string, obj: any): any {
  const result: any = {};
  for (const key in obj) {
    if (obj[key]) {
      const value = obj[key];
      if (
        typeof value === 'object' &&
        !Array.isArray(value) &&
        !('$value' in value)
      ) {
        result[key] = transformValuesToCSSVars(`${parentKey}-${key}`, value);
      } else {
        result[key] = `var(--${parentKey}-${key})`;
      }
    }
  }
  return result;
}

function transformRawValues(obj: any): any {
  const result: any = {};
  for (const key in obj) {
    if (obj[key]) {
      const value = obj[key];
      if (
        typeof value === 'object' &&
        !Array.isArray(value) &&
        !('$value' in value)
      ) {
        result[key] = transformRawValues(value);
      } else {
        result[key] = value.$value;
      }
    }
  }
  return result;
}

function toCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

async function saveFile(filePath: string, content: string): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, content, 'utf-8');
}

async function appendToFile(filePath: string, content: string): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true });
  await appendFile(filePath, content, 'utf-8');
}

async function generateFiles(
  tokensDir: string,
  outputDir: string,
): Promise<void> {
  const files = await readTokensDir(tokensDir);
  const colorFiles: string[] = [];

  for (const file of files) {
    const token = await readJSONFile(file);
    const relativePath = path.relative(tokensDir, file);
    const propertyName = path.basename(relativePath, '.json');
    const directoryName = path.dirname(relativePath);

    const rawValues = transformRawValues(token);
    const cssValues = transformValuesToCSSVars(propertyName, token);

    const camelCaseKey = toCamelCase(propertyName);
    const filePath = `${outputDir}/${directoryName}/${camelCaseKey}.ts`;

    const content = `import { css } from 'lit';\n\nexport const ${camelCaseKey}Raw = ${JSON.stringify(
      rawValues,
      null,
      2,
    )};\n\nexport const ${camelCaseKey} = {\n${generateCssObjectString(cssValues)}\n};\n`;

    await saveFile(filePath, content);

    // Update main index file
    const mainIndexPath = `${outputDir}/${directoryName}/index.ts`;
    const importPath = `./${camelCaseKey}`;
    const exportContent = `export { ${camelCaseKey}, ${camelCaseKey}Raw } from '${importPath}';\n`;
    await appendToFile(mainIndexPath, exportContent);

    // Track color files for the additional export
    if (directoryName === 'color') {
      colorFiles.push(importPath);
    }
  }

  // Add the additional export to props/index.ts for the color directory
  const mainIndexPath = `${outputDir}/index.ts`;
  const exportColorContent = `export * as color from './color';\n`;
  await appendToFile(mainIndexPath, exportColorContent);
}

function generateCssObjectString(cssValues: any): string {
  const entries = Object.entries(cssValues)
    .map(([key, value]) => {
      if (typeof value === 'object' && !Array.isArray(value)) {
        return `  "${key}": {\n${generateCssObjectString(value)}\n  }`;
      }
      return `  "${key}": css\`${value}\``;
    })
    .join(',\n');
  return entries;
}

(async () => {
  const tokensDir = path.join(__dirname, 'tokens');
  const outputDir = `${process.cwd()}/app/client/styles/props`;

  await generateFiles(tokensDir, outputDir);
})();
