import { index, jsonb, pgTable, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

const audit = {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
  createdById: uuid('created_by_id'),
  updatedById: uuid('updated_by_id'),
  deletedById: uuid('deleted_by_id'),
};

export const usersTable = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    ...audit,
  },
  t => [uniqueIndex('users_email_idx').on(t.email)]
);

export const tasksTable = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id),
  ...audit,
});

export const userActivityLogs = pgTable(
  'user_activity_logs',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => usersTable.id),
    method: text('method').notNull(),
    path: text('path').notNull(),
    userAgent: text('user_agent').notNull(),
    ipAddress: text('ip_address').notNull(),
    host: text('host').notNull(),
    referer: text('referer'),
    changes: jsonb('changes').notNull(),
    ...audit,
  },
  t => [index('user_activity_logs_user_id_idx').on(t.userId)]
);
