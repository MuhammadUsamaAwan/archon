import { ACTIONS_LIST } from '@app/schema';
import { index, jsonb, pgEnum, pgTable, primaryKey, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

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

export const rolesTable = pgTable('roles', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  ...audit,
});

export const resourcesTable = pgTable('resources', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  ...audit,
});

export const fieldsTable = pgTable('fields', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  resourceId: uuid('resource_id')
    .notNull()
    .references(() => resourcesTable.id),
  ...audit,
});

export const actionEnum = pgEnum('action_enum', ACTIONS_LIST);

export const permissionsTable = pgTable('permissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  resourceId: uuid('resource_id')
    .notNull()
    .references(() => resourcesTable.id),
  fieldId: uuid('field_id')
    .notNull()
    .references(() => fieldsTable.id),
  action: actionEnum('action').notNull(),
});

export const rolePermissionsTable = pgTable(
  'role_permissions',
  {
    roleId: uuid('role_id')
      .notNull()
      .references(() => rolesTable.id),
    permissionId: uuid('permission_id')

      .notNull()
      .references(() => permissionsTable.id),
    ...audit,
  },
  t => [{ pk: primaryKey({ columns: [t.roleId, t.permissionId] }) }]
);

export const userRolesTable = pgTable(
  'user_roles',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => usersTable.id),
    roleId: uuid('role_id')
      .notNull()
      .references(() => rolesTable.id),
    ...audit,
  },
  t => [{ pk: primaryKey({ columns: [t.userId, t.roleId] }) }]
);

export const userActivityLogsTable = pgTable(
  'user_activity_logs',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    method: text('method').notNull(),
    path: text('path').notNull(),
    userAgent: text('user_agent'),
    ipAddress: text('ip_address'),
    host: text('host'),
    referer: text('referer'),
    changes: jsonb('changes').notNull(),
    ...audit,
  },
  t => [index('user_activity_logs_user_id_idx').on(t.createdById)]
);

export const tasksTable = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id),
  ...audit,
});
