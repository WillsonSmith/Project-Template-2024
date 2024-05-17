import { when } from 'lit/directives/when.js';

import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { FC } from 'hono/jsx';

import api from './api';

const app = new Hono();
app.route('/api', api);

const production = process.env.NODE_ENV === 'production';

if (production) {
  app.get('/styles/*', serveStatic({ root: `./app/client/dist` }));
  app.use('/assets/*', serveStatic({ root: `./app/client/dist` }));
}

app.get('/*', async (c) => {
  const url = new URL(c.req.url);
  const viteUrl = `${url.protocol}//${url.hostname}:5173`;

  if (!production) {
    const asset = await fetch(viteUrl + `/${url.pathname}`);
    if (asset.ok && asset.headers.get('content-type') !== 'text/html') {
      return asset;
    }
  }

  return c.html(
    <Layout title="Project Template 2024">
      <div id="app"></div>

      {when(!production, () => (
        <>
          <script type="module" src={`${viteUrl}/@vite/client`}></script>
          <script type="module" src={`${viteUrl}/app.ts`}></script>
        </>
      ))}
    </Layout>,
  );
});

function loadManifest(path: string) {
  const file = Bun.file(path);
  return file.text();
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const Layout: FC = async ({ title, children }) => {
  const manifest: Record<string, any> = await when(
    production,
    async () => {
      try {
        const path = `${process.cwd()}/app/client/dist/.vite/manifest.json`;
        return JSON.parse(await loadManifest(path));
      } catch (error) {
        console.error('Error parsing manifest:', error);
        return {};
      }
    },
    () => {
      return {};
    },
  );

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

  const mainAssetName = 'app.ts';
  const mainAsset = manifest[mainAssetName];
  const importedChunks = getImportedChunks(manifest, mainAssetName);

  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="stylesheet" href="/styles/root.css" />
        <title>{title}</title>
        {production && (
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
        )}
      </head>
      <body>{children}</body>
    </html>
  );
};

export default app;
