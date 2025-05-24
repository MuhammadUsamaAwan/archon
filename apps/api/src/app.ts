import { serveStatic } from 'hono/bun';
import { authRouter } from './features/auth/auth.router';
import { taskRouter } from './features/task/task.router';
import { configureOpenApi } from './lib/configure-open-api';
import { createRouter } from './lib/create-router';
import { jwtGuard } from './middlewares/jwt-guard';
import { onError } from './middlewares/on-error';

const app = createRouter();

configureOpenApi(app);

app.onError(onError);

const routes = app.basePath('/api').route('/auth', authRouter).use(jwtGuard).route('/tasks', taskRouter);

app.use('/assets/*', serveStatic({ root: './client' })).get('*', serveStatic({ path: './client/index.html' }));

export default app;
export type AppType = typeof routes;
