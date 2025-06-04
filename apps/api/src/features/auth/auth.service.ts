import type { LoginSchema } from '@app/schema';
import { and, eq, isNull } from 'drizzle-orm';
import { HTTPException } from 'hono/http-exception';
import { sign } from 'hono/jwt';
import { db } from '~/api/db';
import { usersTable } from '~/api/db/schema';
import { httpResponse } from '~/api/lib/http';

export class AuthService {
  static async login(body: LoginSchema) {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(and(eq(usersTable.email, body.email), isNull(usersTable.deletedAt)));
    if (!user) throw new HTTPException(400, { message: 'Invalid email or password' });
    const isPasswordValid = await Bun.password.verify(body.password, user.password);
    if (!isPasswordValid) throw new HTTPException(400, { message: 'Invalid email or password' });
    const token = await sign(
      {
        id: user.id,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 1 day
      },
      process.env.JWT_SECRET!
    );
    return httpResponse({ token, name: user.name }, 'Login Successful');
  }
}
