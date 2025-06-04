import { authRouter } from '../features/auth/auth.router';
import { createRouter } from '../lib/create-router';

export function registerRoutes(app: ReturnType<typeof createRouter>) {
  return app.basePath('/api').route('/auth', authRouter);
}

// Exporting the routes for API client
export const routes = registerRoutes(createRouter());
export type Routes = typeof routes;
