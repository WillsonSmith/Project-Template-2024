import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
  const count = Number(c.req.query('count')) || 1;
  return c.json(
    Array.from({ length: count }, () => {
      const width = Math.round(Math.random() * 100 + 400);
      const height = Math.round(Math.random() * 100 + 300);

      return {
        url: `https://loremflickr.com/${width}/${height}/cats`,
        width,
        height,
      };
    }),
  );
});

export default app;
