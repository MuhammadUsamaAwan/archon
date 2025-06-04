import { describeRoute } from 'hono-openapi';
import { validator as zValidator } from 'hono-openapi/zod';

import { loginSchema } from '@app/schema';
import { createRouter } from '~/api/lib/create-router';
import { AuthService } from './auth.service';

export const authRouter = createRouter().post('/login', describeRoute({}), zValidator('json', loginSchema), async c => {
  const body = c.req.valid('json');
  return c.json(await AuthService.login(body));
});
