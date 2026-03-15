import { ZodSchema } from 'zod';

import { HttpError } from './http-error';

export function parseOrThrow<T>(schema: ZodSchema<T>, value: unknown): T {
  const result = schema.safeParse(value);

  if (!result.success) {
    throw new HttpError(400, result.error.issues[0]?.message ?? 'Invalid request');
  }

  return result.data;
}
