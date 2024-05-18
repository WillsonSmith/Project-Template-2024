import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
  const count = Number(c.req.query('count')) || 1;

  const cats = Array.from({ length: count }, () => {
    const width = Math.round(Math.random() * 100 + 400);
    const height = Math.round(Math.random() * 100 + 300);

    return {
      url: `https://loremflickr.com/${width}/${height}/cats`,
      width,
      height,
    };
  });

  return new Response(JSON.stringify(cats), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=300',
    },
  });
});

export default app;
