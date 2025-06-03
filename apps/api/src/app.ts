import { Hono } from 'hono';

const app = new Hono();
const routes = app.get('/', c => c.json({ message: 'Hello from Api!' }));

export type AppType = typeof routes;

export default app;
