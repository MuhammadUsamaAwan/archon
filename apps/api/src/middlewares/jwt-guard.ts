import { and, eq, isNull } from 'drizzle-orm';
import { createMiddleware } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';
import { verify } from 'hono/jwt';
import { db } from '../db';
import { usersTable } from '../db/schema';

export const jwtGuard = createMiddleware(async (c, next) => {
  try {
    const token = c.req.header('Authorization')?.split(' ')[1];
    if (!token) throw new HTTPException(401, { message: 'Unauthorized' });
    const verified = await verify(token, process.env.JWT_SECRET!);
    const [user] = await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(and(eq(usersTable.id, verified.id as string), isNull(usersTable.deletedAt)));
    if (!user) throw new HTTPException(401, { message: 'Unauthorized' });
    c.set('user', user);
    await next();
  } catch (_error) {
    throw new HTTPException(401, { message: 'Unauthorized' });
  }
});
