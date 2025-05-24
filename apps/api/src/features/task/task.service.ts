import type { InsertTaskSchema } from '@app/schema';
import { and, eq, isNull } from 'drizzle-orm';
import type { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { db } from '~/api/db';
import { tasksTable } from '~/api/db/schema';
import { httpResponse } from '~/api/lib/http';
import { logUserActivity } from '~/api/lib/log-user-activity';

export class TaskService {
  static async getAll() {
    const result = await db
      .select({
        id: tasksTable.id,
        name: tasksTable.name,
        description: tasksTable.description,
      })
      .from(tasksTable)
      .where(isNull(tasksTable.deletedAt));
    return httpResponse(result);
  }

  static async create(c: Context, body: InsertTaskSchema, userId: string) {
    const [newTask] = await db
      .insert(tasksTable)
      .values({ ...body, createdAt: new Date(), userId })
      .returning();
    await logUserActivity(c, userId, null, newTask);
    return httpResponse(undefined, 'Task created successfully');
  }

  static async update(c: Context, id: string, body: InsertTaskSchema, userId: string) {
    const [existingTask] = await db
      .select()
      .from(tasksTable)
      .where(and(eq(tasksTable.id, id), isNull(tasksTable.deletedAt)));
    if (!existingTask) {
      throw new HTTPException(404, { message: 'Task not found' });
    }
    const [updatedTask] = await db
      .update(tasksTable)
      .set({ ...body, updatedAt: new Date(), updatedById: userId })
      .where(eq(tasksTable.id, id))
      .returning();
    await logUserActivity(c, userId, existingTask, updatedTask);
    return httpResponse(undefined, 'Task updated successfully');
  }

  static async delete(c: Context, id: string, userId: string) {
    const [existingTask] = await db
      .select()
      .from(tasksTable)
      .where(and(eq(tasksTable.id, id), isNull(tasksTable.deletedAt)));
    if (!existingTask) {
      throw new HTTPException(404, { message: 'Task not found' });
    }
    const [updatedTask] = await db
      .update(tasksTable)
      .set({ deletedAt: new Date(), deletedById: userId })
      .where(eq(tasksTable.id, id))
      .returning();
    await logUserActivity(c, userId, existingTask, updatedTask);
    return httpResponse(undefined, 'Task deleted successfully');
  }
}
