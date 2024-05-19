import { appendFile, mkdir, readdir, writeFile } from 'node:fs/promises';

export async function readTokensDir(dir: string): Promise<string[][]> {
  const tokens = (
    await readdir(dir, {
      recursive: true,
      withFileTypes: true,
    })
  )
    .sort((token) => {
      return token.isDirectory() ? -1 : 1;
    })
    .map((token) => token.name)
    .map((name) => name.split('/'));
  return tokens;
}

export async function saveFile(
  filePath: string,
  content: string,
): Promise<void> {
  await writeFile(filePath, content);
}

export async function appendToFile(
  filePath: string,
  content: string,
): Promise<void> {
  await appendFile(filePath, content);
}

export async function createDir(dir: string): Promise<void> {
  await mkdir(dir, { recursive: true });
}

export async function readFile(filePath: string): Promise<string> {
  const file = Bun.file(filePath);
  return await file.text();
}
