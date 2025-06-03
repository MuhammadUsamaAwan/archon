export const TASK_STATUSES = {
  COMPLETED: 'completed',
  PENDING: 'pending',
} as const;
export const TASK_STATUSES_ARRAY = [TASK_STATUSES.COMPLETED, TASK_STATUSES.PENDING] as const;
export type TaskStatus = (typeof TASK_STATUSES_ARRAY)[number];
