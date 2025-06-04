import { taskSchema } from '@app/schema';
import { describeRoute } from 'hono-openapi';
import { validator as zValidator } from 'hono-openapi/zod';
import { createRouter } from '~/api/lib/create-router';
import { permissionGuard } from '~/api/middlewares/permission-guard';
import { TaskService } from './task.service';

export const taskRouter = createRouter()
  .get('/', describeRoute({}), permissionGuard('view', 'task'), async c => c.json(await TaskService.getAll()))
  .post('/', describeRoute({}), permissionGuard('add', 'task'), zValidator('json', taskSchema), async c => {
    const body = c.req.valid('json');
    const userId = c.get('user').id;
    return c.json(await TaskService.create(body, userId));
  })
  .put('/:id', describeRoute({}), permissionGuard('edit', 'task'), zValidator('json', taskSchema), async c => {
    const id = c.req.param('id');
    const body = c.req.valid('json');
    const userId = c.get('user').id;
    return c.json(await TaskService.update(id, body, userId));
  })
  .delete('/:id', describeRoute({}), permissionGuard('delete', 'task'), async c => {
    const id = c.req.param('id');
    const userId = c.get('user').id;
    return c.json(await TaskService.delete(id, userId));
  });
