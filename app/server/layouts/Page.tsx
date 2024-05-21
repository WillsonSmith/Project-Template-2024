import { when } from 'lit/directives/when.js';

import { FC } from 'hono/jsx';

function loadManifest(path: string) {
  const file = Bun.file(path);
  return file.text();
}

const production = process.env.NODE_ENV === 'production';

export const Page: FC = async ({ title, children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="stylesheet" href="/styles/root.css" />
        <title>{title}</title>
        <ProductionAssets production={production} />
      </head>
      <body>{children}</body>
    </html>
  );
};

const manifest = await when(production, async () => {
  try {
    const path = `${process.cwd()}/app/client/dist/.vite/manifest.json`;
    return JSON.parse(await loadManifest(path));
  } catch (error) {
    console.error('Error parsing manifest:', error);
    return {};
  }
});

const ProductionAssets = async ({ production }: { production: boolean }) => {
  if (production) {
    const mainAssetName = 'app.ts';
    const mainAsset = manifest[mainAssetName];
    const importedChunks = getImportedChunks(manifest, mainAssetName);

    return (
      <>
        {mainAsset.css?.map((cssFile: string) => (
          <link rel="stylesheet" href={`/${cssFile}`} />
        ))}
        {importedChunks.flatMap((chunk) =>
          chunk.css?.map((cssFile: string) => (
            <link rel="stylesheet" href={`/${cssFile}`} />
          )),
        )}
        <script type="module" src={`/${mainAsset.file}`}></script>
        {importedChunks.map((chunk) => (
          <link rel="modulepreload" href={`/${chunk.file}`} />
        ))}
      </>
    );
  }
  return <></>;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
function getImportedChunks(
  manifest: Record<string, any>,
  name: string,
  seen = new Set(),
): any[] {
  const chunks: any[] = [];
  function recurse(file: string) {
    if (seen.has(file)) return;
    seen.add(file);
    const chunk = manifest[file];
    if (chunk && chunk.imports) {
      chunk.imports.forEach((imported: string) => {
        chunks.push(manifest[imported]);
        recurse(imported);
      });
    }
  }
  recurse(name);
  return chunks;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
