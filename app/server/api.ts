import { Hono } from 'hono';

import cats from './api/cats';

const app = new Hono();

app.route('/cats', cats);

export default app;
