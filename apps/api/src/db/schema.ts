import { ACTIONS_ARRAY, TASK_STATUSES_ARRAY } from '@app/schema';
import { pgEnum, pgTable, primaryKey, text, timestamp, uuid } from 'drizzle-orm/pg-core';

const audit = {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
  createdById: uuid('created_by_id'),
  updatedById: uuid('updated_by_id'),
  deletedById: uuid('deleted_by_id'),
};

export const usersTable = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  password: text('password').notNull(),
  ...audit,
});

export const taskStatusEnum = pgEnum('tasks_status_enum', TASK_STATUSES_ARRAY);

export const tasksTable = pgTable('tasks', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  status: taskStatusEnum('status').notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id),
  ...audit,
});

export const rolesTable = pgTable('roles', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  ...audit,
});

export const actionEnum = pgEnum('action_enum', ACTIONS_ARRAY);

export const permissionsTable = pgTable('permissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  action: actionEnum('action').notNull(),
  resource: text('name').notNull(),
  ...audit,
});

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
  t => [primaryKey({ columns: [t.userId, t.roleId] })]
);

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
  t => [primaryKey({ columns: [t.roleId, t.permissionId] })]
);
