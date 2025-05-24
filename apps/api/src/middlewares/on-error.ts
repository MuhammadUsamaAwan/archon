import type { ErrorHandler } from 'hono';
import { HTTPException } from 'hono/http-exception';

export const onError: ErrorHandler = (err, c) => {
  return c.json(
    {
      message: err.message,
    },
    err instanceof HTTPException ? err.status : 500
  );
};
