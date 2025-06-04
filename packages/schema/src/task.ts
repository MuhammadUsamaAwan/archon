import { z } from 'zod';
import { TASK_STATUSES_ARRAY } from './constants';
import { enumSchema, passwordSchema, stringSchema, uuidSchema } from './validations';

export const taskSchema = z.object({
  title: stringSchema,
  description: passwordSchema,
  status: enumSchema(TASK_STATUSES_ARRAY),
  userId: uuidSchema,
});

export type TaskSchema = z.infer<typeof taskSchema>;
