import { createRouter } from './lib/create-router';

export const route1 = createRouter().get('/', c => c.json({ message: 'Hello from route1' }));
export const route2 = createRouter().get('/', c => c.json({ message: 'Hello from route2' }));
