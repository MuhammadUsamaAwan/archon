import { z } from 'zod';

export const emailSchema = z.string({ required_error: 'Required' }).trim().email({ message: 'Invalid Email' });

export const passwordSchema = z
  .string({ required_error: 'Required' })
  .trim()
  .min(6, { message: 'Must be at least 6 characters long' })
  .max(20, { message: 'Must be at most 20 characters long' });

export const stringSchema = z
  .string({ required_error: 'Required' })
  .trim()
  .min(1, { message: 'Must be at least 1 character long' })
  .max(100, { message: 'Must be at most 100 characters long' });

export const uuidSchema = z.string().uuid({ message: 'Invalid' });

export const textSchema = z
  .string({ required_error: 'Required' })
  .trim()
  .min(1, { message: 'Must be at least 1 character long' })
  .max(500, { message: 'Must be at most 500 characters long' });

export function enumSchema<T extends readonly [string, ...string[]]>(values: T) {
  return z.enum(values, { message: 'Invalid' });
}
