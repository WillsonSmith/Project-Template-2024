import { appendToFile, createDir, saveFile } from '../utils/fileUtils';
import { toCamelCase } from '../utils/stringUtils';
import {
  generateColorCssTags,
  generateCssTags,
  reshapeTokens,
} from '../utils/tokenUtils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateFiles(obj: any, dir: string): Promise<void> {
  for (const key in obj) {
    if (key in obj) {
      const camelCaseKey = toCamelCase(key);
      const value = obj[key];

      if (typeof value === 'object' && !Array.isArray(value)) {
        if (key === 'color') {
          const colorDir = `${dir}/color`;
          await createDir(colorDir);

          for (const color in value) {
            if (key in obj) {
              const colorValue = reshapeTokens(value[color]);
              const colorCamelCase = toCamelCase(color);
              const colorFilePath = `${colorDir}/${colorCamelCase}.ts`;
              const colorContent = `import {css} from 'lit';\n\nexport const ${colorCamelCase}Values = ${JSON.stringify(
                colorValue,
                null,
                2,
              )};\n\nexport const ${colorCamelCase} = ${generateColorCssTags('color', colorCamelCase, colorValue)};\n`;
              await saveFile(colorFilePath, colorContent);

              // Update color index file
              const colorIndexPath = `${colorDir}/index.ts`;
              const importPath = `./${colorCamelCase}`;
              const exportContent = `export { ${colorCamelCase}, ${colorCamelCase}Values } from '${importPath}';\n`;
              await appendToFile(colorIndexPath, exportContent);
            }
          }

          // Update main index file
          const mainIndexPath = `${dir}/index.ts`;
          const mainImportPath = `./color`;
          const mainExportContent = `export * as color from '${mainImportPath}';\n`;
          await appendToFile(mainIndexPath, mainExportContent);
        } else {
          const reshapedValue = reshapeTokens(value);
          const content = `import {css} from 'lit';\n\nexport const ${camelCaseKey}Values = ${JSON.stringify(
            reshapedValue,
            null,
            2,
          )};\n\nexport const ${camelCaseKey} = ${generateCssTags(key, reshapedValue)};\n`;
          const filePath = `${dir}/${camelCaseKey}.ts`;
          await saveFile(filePath, content);

          // Update main index file
          const mainIndexPath = `${dir}/index.ts`;
          const importPath = `./${camelCaseKey}`;
          const exportContent = `export { ${camelCaseKey}, ${camelCaseKey}Values } from '${importPath}';\n`;
          await appendToFile(mainIndexPath, exportContent);
        }
      }
    }
  }
}
