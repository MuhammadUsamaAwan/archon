import { z } from 'zod';

export const stringSchema = z
  .string({ required_error: 'Required' })
  .trim()
  .min(1, {
    message: 'Required',
  })
  .max(100, {
    message: 'Must be 100 characters or less',
  });

export const stringSchemaOptional = z.string().trim().max(100, { message: 'Must be 100 characters or less' });

export const uuidSchema = z.string({ required_error: 'Required' }).trim().uuid({ message: 'Invalid' });

export const uuidSchemaOptional = z.string().trim().uuid({ message: 'Invalid' }).optional();

export const dateSchema = z.coerce.date({ required_error: 'Required' });

export const dateSchemaOptional = z.coerce.date().optional();

export const emailSchema = z
  .string({ required_error: 'Required' })
  .trim()
  .email({ message: 'Invalid email address' })
  .max(100, {
    message: 'Must be 100 characters or less',
  });

export const passwordSchema = z
  .string({ required_error: 'Required' })
  .trim()
  .min(8, {
    message: 'Must be at least 8 characters',
  })
  .max(100, {
    message: 'Must be 100 characters or less',
  });

export const numberSchema = z.number({ required_error: 'Required' });

export const numberSchemaOptional = z.number().optional();
