import { z } from 'zod';

export const emailSchema = z.preprocess(
  val => {
    if (typeof val === 'string') {
      return val.trim() === '' ? undefined : val.trim();
    }
    return val;
  },
  z.string({ required_error: 'Required' }).email({ message: 'Invalid email' })
);

export const passwordSchema = z.preprocess(
  val => {
    if (typeof val === 'string') {
      return val.trim() === '' ? undefined : val.trim();
    }
    return val;
  },
  z
    .string({ message: 'Required' })
    .min(6, { message: 'Must be at least 6 characters long' })
    .max(20, { message: 'Must be at most 20 characters long' })
);

export const stringSchema = z.preprocess(
  val => {
    if (typeof val === 'string') {
      return val.trim() === '' ? undefined : val.trim();
    }
    return val;
  },
  z.string({ message: 'Required' }).max(100, { message: 'Must be at most 100 characters long' })
);

export const optionalStringSchema = z.preprocess(val => {
  if (typeof val === 'string') {
    return val.trim() === '' ? undefined : val.trim();
  }
  return val;
}, z
  .string({ message: 'Required' })
  .max(100, { message: 'Must be at most 100 characters long' })
  .optional()
  .nullable());

export const textSchema = z.preprocess(
  val => {
    if (typeof val === 'string') {
      return val.trim() === '' ? undefined : val.trim();
    }
    return val;
  },
  z.string({ message: 'Required' }).max(500, { message: 'Must be at most 500 characters long' })
);

export const optionalTextSchema = z.preprocess(val => {
  if (typeof val === 'string') {
    return val.trim() === '' ? undefined : val.trim();
  }
  return val;
}, z
  .string({ message: 'Required' })
  .max(500, { message: 'Must be at most 500 characters long' })
  .optional()
  .nullable());

export function enumSchema<T extends readonly [string, ...string[]]>(values: T) {
  return z.preprocess(
    val => {
      if (typeof val === 'string') {
        return val.trim() === '' ? undefined : val.trim();
      }
      return val;
    },
    z.enum(values, { required_error: 'Required', message: 'Invalid value' })
  );
}

export function optionalEnumSchema<T extends readonly [string, ...string[]]>(values: T) {
  return z.preprocess(val => {
    if (typeof val === 'string') {
      return val.trim() === '' ? undefined : val.trim();
    }
    return val;
  }, z.enum(values, { message: 'Invalid value' }).optional().nullable());
}

export const booleanSchema = z.boolean({ required_error: 'Required', message: 'Invalid value' });

export const optionalBooleanSchema = z.boolean({ message: 'Invalid value' }).optional();

export const numberSchema = z.preprocess(
  val => {
    if (typeof val === 'string') {
      return val.trim() === '' ? undefined : Number(val.trim());
    }
    return val;
  },
  z.number({ required_error: 'Required', message: 'Invalid Value' })
);

export const optionalNumberSchema = z.preprocess(val => {
  if (typeof val === 'string') {
    return val.trim() === '' ? undefined : Number(val.trim());
  }
  return val;
}, z.number({ message: 'Invalid value' }).optional().nullable());

export const dateSchema = z.preprocess(
  val => {
    if (typeof val === 'string') {
      return val.trim() === '' ? undefined : new Date(val.trim());
    }
    return val;
  },
  z.date({ required_error: 'Required', message: 'Invalid date' })
);

export const optionalDateSchema = z.preprocess(val => {
  if (typeof val === 'string') {
    return val.trim() === '' ? undefined : new Date(val.trim());
  }
  return val;
}, z.date({ message: 'Invalid date' }).optional().nullable());
