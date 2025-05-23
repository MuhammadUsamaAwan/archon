import { z } from 'zod';
import { stringSchema } from './validations';

export const insertTaskSchema = z.object({
  title: stringSchema,
  description: stringSchema,
});

export type InsertTaskSchema = z.infer<typeof insertTaskSchema>;
