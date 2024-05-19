/* eslint-disable @typescript-eslint/no-explicit-any */
import { readFile } from '../utils/fileUtils';

export async function parseTokens(
  arrays: string[][],
  dir: string,
): Promise<{ [key: string]: any }> {
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
          const filePath = `${dir}/${path.join('/')}`;
          const fileContent = await readFile(filePath);
          current[propertyName] = JSON.parse(fileContent);
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
