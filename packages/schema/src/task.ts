import { z } from 'zod';
import { TASK_STATUSES_ARRAY } from './constants';
import { enumSchema, stringSchema, textSchema } from './validations';

export const taskSchema = z.object({
  title: stringSchema,
  description: textSchema,
  status: enumSchema(TASK_STATUSES_ARRAY),
  userId: stringSchema,
});

export type TaskSchema = z.infer<typeof taskSchema>;
