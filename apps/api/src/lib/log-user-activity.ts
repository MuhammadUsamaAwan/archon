import type { Context } from 'hono';
import { getConnInfo } from 'hono/bun';
import { db } from '~/api/db';
import { userActivityLogsTable } from '~/api/db/schema';

export async function logUserActivity(
  c: Context,
  userId: string,
  before: Record<string, unknown> | null,
  after: Record<string, unknown> | null
) {
  await db.insert(userActivityLogsTable).values({
    method: c.req.method,
    path: c.req.path,
    userAgent: c.req.header('user-agent'),
    ipAddress: getConnInfo(c).remote.address,
    host: c.req.header('host'),
    referer: c.req.header('referer'),
    createdAt: new Date(),
    createdById: userId,
    changes: before && after ? getObjectDiff(before, after) : (after ?? {}),
  });
}

export function getObjectDiff(oldObj: Record<string, unknown>, newObj: Record<string, unknown>) {
  const diff: Record<string, { from: unknown; to: unknown }> = {};
  for (const key in newObj) {
    if (newObj[key] !== oldObj[key]) {
      diff[key] = { from: oldObj[key], to: newObj[key] };
    }
  }
  return diff;
}
