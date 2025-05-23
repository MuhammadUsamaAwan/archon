import { z } from 'zod';
import { emailSchema, passwordSchema } from './validations';

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginSchema = z.infer<typeof loginSchema>;
