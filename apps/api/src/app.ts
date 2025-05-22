import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';

const app = new Hono();

app.basePath('/api').get('/', c => {
  return c.text('Hello Hono!');
});

app.use('/assets/*', serveStatic({ root: './client' })).get('*', serveStatic({ path: './client/index.html' }));

export default app;
