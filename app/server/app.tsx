import { when } from 'lit/directives/when.js';

import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';

import api from './api';
import { Page } from './layouts/Page';

const app = new Hono();
app.route('/api', api);

const production = process.env.NODE_ENV === 'production';

if (production) {
  app.use('/styles/*', serveStatic({ root: `./app/client/dist` }));
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
    <Page title="Project Template 2024">
      <div id="app"></div>

      {when(!production, () => (
        <>
          <script type="module" src={`${viteUrl}/@vite/client`}></script>
          <script type="module" src={`${viteUrl}/app.ts`}></script>
        </>
      ))}
    </Page>,
  );
});

export default app;
