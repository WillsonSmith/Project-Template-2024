/* eslint-disable @typescript-eslint/no-explicit-any */
import { toCamelCase } from './stringUtils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function reshapeTokens(obj: any): any {
  const result: any = {};

  for (const key in obj) {
    if (key in obj) {
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

export function transformValuesToCSSVars(parentKey: string, obj: any): any {
  const result: any = {};
  for (const key in obj) {
    if (obj[key]) {
      result[key] = `var(--${parentKey}-${key})`;
    }
  }
  return result;
}

export function transformColorValuesToCSSVars(
  parentKey: string,
  colorKey: string,
  obj: any,
): any {
  const result: any = {};
  for (const key in obj) {
    if (key in obj) {
      result[key] = `var(--${parentKey}-${colorKey}-${key})`;
    }
  }
  return result;
}

export function generateCssTags(parentKey: string, obj: any): string {
  const result: any = {};
  for (const key in obj) {
    if (key in obj) {
      result[key] = `css\`var(--${parentKey}-${key})\``;
    }
  }
  return JSON.stringify(result, null, 2)
    .replace(/"css`/g, 'css`')
    .replace(/`"/g, '`');
}

export function generateColorCssTags(
  parentKey: string,
  colorKey: string,
  obj: any,
): string {
  const result: any = {};
  for (const key in obj) {
    if (key in obj) {
      result[key] = `css\`var(--${parentKey}-${colorKey}-${key})\``;
    }
  }
  return JSON.stringify(result, null, 2)
    .replace(/"css`/g, 'css`')
    .replace(/`"/g, '`');
}
