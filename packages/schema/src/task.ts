import { z } from 'zod';
import { TASK_STATUSES_ARRAY } from './constants';
import { emailSchema, enumSchema, passwordSchema, uuidSchema } from './validations';

export const taskSchema = z.object({
  title: emailSchema,
  description: passwordSchema,
  status: enumSchema(TASK_STATUSES_ARRAY),
  userId: uuidSchema,
});

export type TaskSchema = z.infer<typeof taskSchema>;
