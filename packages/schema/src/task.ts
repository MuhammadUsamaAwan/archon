import { z } from 'zod';
import { stringSchema, uuidSchema } from './validations';

export const insertTaskSchema = z.object({
  name: stringSchema,
  description: stringSchema,
  userId: uuidSchema,
});

export type InsertTaskSchema = z.infer<typeof insertTaskSchema>;
