import { authRouter } from '../features/auth/auth.router';
import { taskRouter } from '../features/task/task.router';
import { createRouter } from '../lib/create-router';
import { jwtGuard } from '../middlewares/jwt-guard';

export function registerRoutes(app: ReturnType<typeof createRouter>) {
  return app.basePath('/api').route('/auth', authRouter).use(jwtGuard).route('/tasks', taskRouter);
}

// Exporting the routes for API client
export const routes = registerRoutes(createRouter());
export type Routes = typeof routes;
