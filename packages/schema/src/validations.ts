import { z } from 'zod';

export const emailSchema = z.string({ required_error: 'Required' }).trim().email({ message: 'Invalid' });

export const passwordSchema = z
  .string({ required_error: 'Required' })
  .trim()
  .min(6, { message: 'Must be at least 6 characters long' })
  .max(20, { message: 'Must be at most 20 characters long' });
