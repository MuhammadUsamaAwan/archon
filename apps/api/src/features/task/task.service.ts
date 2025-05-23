import type { InsertTaskSchema } from '@app/schema';
import { and, eq } from 'drizzle-orm';
import { db } from '~/api/db';
import { tasksTable } from '~/api/db/schema';
import { httpResponse } from '~/api/lib/http';

export class TaskService {
  static async getAll() {
    const result = await db
      .select({
        id: tasksTable.id,
        title: tasksTable.title,
        description: tasksTable.description,
      })
      .from(tasksTable);

    return httpResponse(result);
  }

  static async create(body: InsertTaskSchema, userId: string) {
    await db.insert(tasksTable).values({ ...body, userId });
    return httpResponse(undefined, 'Task created successfully');
  }

  static async update(id: string, body: InsertTaskSchema, userId: string) {
    await db
      .update(tasksTable)
      .set(body)
      .where(and(eq(tasksTable.id, id), eq(tasksTable.userId, userId)));
    return httpResponse(undefined, 'Task updated successfully');
  }

  static async delete(id: string, userId: string) {
    await db
      .delete(tasksTable)
      .where(and(eq(tasksTable.id, id), eq(tasksTable.userId, userId)))
      .execute();
    return httpResponse(undefined, 'Task deleted successfully');
  }
}
