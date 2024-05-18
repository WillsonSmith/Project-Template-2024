import { when } from 'lit/directives/when.js';

import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';

import { Layout } from './Layout';
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

export default app;
