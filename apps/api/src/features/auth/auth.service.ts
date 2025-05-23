import type { LoginSchema } from '@app/schema';
import { eq } from 'drizzle-orm';
import { HTTPException } from 'hono/http-exception';
import { sign } from 'hono/jwt';
import { db } from '~/api/db';
import { usersTable } from '~/api/db/schema';
import { httpResponse } from '~/api/lib/http';

export class AuthService {
  static async login(body: LoginSchema) {
    const [user] = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        password: usersTable.password,
      })
      .from(usersTable)
      .where(eq(usersTable.email, body.email));

    if (!user) {
      throw new HTTPException(401, { message: 'Invalid email or password' });
    }

    const passwordMatch = await Bun.password.verify(body.password, user.password);
    if (!passwordMatch) {
      throw new HTTPException(400, { message: 'Invalid Credentials' });
    }
    const token = await sign(
      {
        id: user.id,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 1 day
      },
      process.env.JWT_SECRET as string
    );
    return httpResponse({ token, name: user.name }, 'Login Successful');
  }
}
