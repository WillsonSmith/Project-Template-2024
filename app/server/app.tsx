import { when } from 'lit/directives/when.js';

import { Hono } from 'hono';
import { FC } from 'hono/jsx';

const app = new Hono();

const production = process.env.NODE_ENV === 'production';

app.get('/api/cats', (c) => {
  const count = Number(c.req.query('count')) || 1;
  const randomImages = Array.from({ length: count }, () => {
    const width = Math.round(Math.random() * 100 + 400);
    const height = Math.round(Math.random() * 100 + 300);

    return {
      url: `https://loremflickr.com/${width}/${height}/cats`,
      width,
      height,
    };
  });

  return c.json(randomImages);
});

app.get('/*', async (c) => {
  let manifest: Record<string, string> = {};
  if (production) {
    try {
      // const manifestPath = `${process.cwd()}/app/client/dist/.vite/manifest.json`;
      const manifestFile = { text: async () => '' }; // load file here;

      manifest = JSON.parse(await manifestFile.text());
      console.log('Manifest:\n', manifest);
    } catch (error) {
      console.error(error);
    }
  }

  const url = new URL(c.req.url);
  const viteUrl = `${url.protocol}//${url.hostname}:5173`;

  if (!production) {
    const asset = await fetch(viteUrl + `/${url.pathname}`);
    if (asset.ok) {
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

const Layout: FC = ({ title, children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/styles/root.css" />
        <title>{title}</title>
      </head>
      <body>{children}</body>
    </html>
  );
};

export default app;
