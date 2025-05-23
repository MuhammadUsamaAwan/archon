import { Hono } from 'hono';

import type { Variables } from '~/api/types';

export function createRouter() {
  return new Hono<{ Variables: Variables }>();
}
