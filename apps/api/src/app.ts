import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';

const app = new Hono();

const route = app.basePath('/api').get('/', c => {
  return c.json({ message: 'Hello from API!' });
});

app.use('/assets/*', serveStatic({ root: './client' })).get('*', serveStatic({ path: './client/index.html' }));

export default app;

export type AppType = typeof route;
