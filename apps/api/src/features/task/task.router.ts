import { describeRoute } from 'hono-openapi';
import { validator as zValidator } from 'hono-openapi/zod';

import { insertTaskSchema } from '@app/schema';
import { createRouter } from '~/api/lib/create-router';
import { TaskService } from './task.service';

export const taskRouter = createRouter();

taskRouter
  .get('/', describeRoute({}), async c => c.json(await TaskService.getAll()))
  .post('/', describeRoute({}), zValidator('json', insertTaskSchema), async c => {
    const body = c.req.valid('json');
    const userId = c.get('user').id;
    return c.json(await TaskService.create(c, body, userId));
  })
  .put('/:id', describeRoute({}), zValidator('json', insertTaskSchema), async c => {
    const id = c.req.param('id');
    const body = c.req.valid('json');
    const userId = c.get('user').id;
    return c.json(await TaskService.update(c, id, body, userId));
  })
  .delete('/:id', describeRoute({}), async c => {
    const id = c.req.param('id');
    const userId = c.get('user').id;
    return c.json(await TaskService.delete(c, id, userId));
  });
