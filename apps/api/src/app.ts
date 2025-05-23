import { serveStatic } from 'hono/bun';
import { configureOpenApi } from './lib/configure-open-api';
import { createRouter } from './lib/create-router';
import { route1 } from './routes';

const app = createRouter();

configureOpenApi(app);

const routes = app.basePath('/api').route('/route1', route1).route('/route2', route1);

app.use('/assets/*', serveStatic({ root: './client' })).get('*', serveStatic({ path: './client/index.html' }));

export default app;
export type AppType = typeof routes;
