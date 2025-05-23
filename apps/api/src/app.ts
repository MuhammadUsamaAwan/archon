import { serveStatic } from 'hono/bun';
import { authRouter } from './features/auth/auth.router';
import { taskRouter } from './features/task/task.router';
import { configureOpenApi } from './lib/configure-open-api';
import { createRouter } from './lib/create-router';

const app = createRouter();

configureOpenApi(app);

const routes = app.basePath('/api').route('/auth', authRouter).route('/tasks', taskRouter);

app.use('/assets/*', serveStatic({ root: './client' })).get('*', serveStatic({ path: './client/index.html' }));

export default app;
export type AppType = typeof routes;
