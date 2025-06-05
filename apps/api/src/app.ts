import { serveStatic } from 'hono/bun';
import { configureOpenAPI } from './lib/configure-open-api';
import { createRouter } from './lib/create-router';
import { onError } from './middlewares/on-error';
import { registerRoutes } from './routes';

const app = createRouter();

configureOpenAPI(app);

app.onError(onError);

registerRoutes(app);

app.use('*', serveStatic({ root: './static' }));
app.use('*', async c => {
  return c.html(await Bun.file('./static/index.html').text());
});

export default app;
