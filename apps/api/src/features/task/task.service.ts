import type { TaskSchema } from '@app/schema';
import { and, asc, eq, isNull } from 'drizzle-orm';
import { db } from '~/api/db';
import { tasksTable, usersTable } from '~/api/db/schema';
import { httpResponse } from '~/api/lib/http';

export class TaskService {
  static async getAll() {
    const result = await db
      .select({
        id: tasksTable.id,
        title: tasksTable.title,
        description: tasksTable.description,
        user: usersTable.name,
        userId: tasksTable.userId,
      })
      .from(tasksTable)
      .leftJoin(usersTable, and(eq(tasksTable.userId, usersTable.id), isNull(usersTable.deletedAt)))
      .where(isNull(tasksTable.deletedAt))
      .orderBy(asc(tasksTable.createdAt));
    return httpResponse(result);
  }

  static async create(body: TaskSchema, employeeId: string) {
    await db.insert(tasksTable).values({ ...body, createdById: employeeId });
    return httpResponse(undefined, 'Task created successfully');
  }

  static async update(id: string, body: TaskSchema, employeeId: string) {
    await db
      .update(tasksTable)
      .set({ ...body, updatedAt: new Date(), updatedById: employeeId })
      .where(eq(tasksTable.id, id));
    return httpResponse(undefined, 'Task updated successfully');
  }

  static async delete(id: string, employeeId: string) {
    await db.update(tasksTable).set({ deletedAt: new Date(), deletedById: employeeId }).where(eq(tasksTable.id, id));
    return httpResponse(undefined, 'Task deleted successfully');
  }
}
