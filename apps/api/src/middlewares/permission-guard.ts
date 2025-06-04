import type { Action } from '@app/schema';
import { and, eq, isNull } from 'drizzle-orm';
import { createMiddleware } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';
import { db } from '../db';
import { permissionsTable, rolePermissionsTable, userRolesTable, usersTable } from '../db/schema';

export const permissionGuard = (action: Action, resource: string) =>
  createMiddleware(async (c, next) => {
    const userId = c.get('user').id as string;
    const [allowed] = await db
      .select({ userId: usersTable.id })
      .from(usersTable)
      .innerJoin(
        userRolesTable,
        and(eq(usersTable.id, userRolesTable.userId), isNull(userRolesTable.deletedAt), eq(usersTable.id, userId))
      )
      .innerJoin(
        rolePermissionsTable,
        and(eq(rolePermissionsTable.roleId, rolePermissionsTable.roleId), isNull(rolePermissionsTable.deletedAt))
      )
      .innerJoin(
        permissionsTable,
        and(
          eq(rolePermissionsTable.permissionId, permissionsTable.id),
          isNull(permissionsTable.deletedAt),
          eq(permissionsTable.action, action),
          eq(permissionsTable.resource, resource)
        )
      );
    if (!allowed) {
      throw new HTTPException(403, { message: 'Permission denied' });
    }
    await next();
  });
