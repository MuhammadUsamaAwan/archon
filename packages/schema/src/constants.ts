export const TASK_STATUSES = {
  COMPLETED: 'completed',
  PENDING: 'pending',
} as const;
export const TASK_STATUSES_ARRAY = [TASK_STATUSES.COMPLETED, TASK_STATUSES.PENDING] as const;
export type TaskStatus = (typeof TASK_STATUSES_ARRAY)[number];

export const ACTIONS = {
  VIEW: 'view',
  ADD: 'add',
  EDIT: 'edit',
  DELETE: 'delete',
} as const;
export const ACTIONS_ARRAY = [ACTIONS.VIEW, ACTIONS.ADD, ACTIONS.EDIT, ACTIONS.DELETE] as const;
export type Action = (typeof ACTIONS_ARRAY)[number];
