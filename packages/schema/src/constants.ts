export const ACTION = {
  VIEW: 'view',
  ADD: 'add',
  EDIT: 'edit',
  DELETE: 'delete',
} as const;
export const ACTIONS_LIST = [ACTION.VIEW, ACTION.ADD, ACTION.EDIT, ACTION.DELETE] as const;
export type Action = (typeof ACTIONS_LIST)[number];
