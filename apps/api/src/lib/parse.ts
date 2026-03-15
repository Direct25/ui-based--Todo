import { z } from 'zod';

import { HttpError } from './http-error.js';

export function parseOrThrow<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  value: unknown,
): z.output<TSchema> {
  const result = schema.safeParse(value);

  if (!result.success) {
    throw new HttpError(400, result.error.issues[0]?.message ?? 'Invalid request');
  }

  return result.data;
}
