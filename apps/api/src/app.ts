import { configureOpenAPI } from './lib/configure-open-api';
import { createRouter } from './lib/create-router';
import { onError } from './middlewares/on-error';
import { registerRoutes } from './routes';

const app = createRouter();

configureOpenAPI(app);

app.onError(onError);

registerRoutes(app);

export default app;
