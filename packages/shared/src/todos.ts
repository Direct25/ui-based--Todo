import { z } from 'zod';

export const todoStatusSchema = z.enum(['active', 'completed']);
export const todoPrioritySchema = z.enum(['low', 'medium', 'high']);

export const todoSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(120),
  description: z.string().max(280).default(''),
  priority: todoPrioritySchema,
  status: todoStatusSchema,
  dueDate: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createTodoSchema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().max(280).default(''),
  priority: todoPrioritySchema.default('medium'),
  dueDate: z
    .string()
    .datetime({ offset: true })
    .nullable()
    .or(z.literal(''))
    .transform((value) => (value === '' ? null : value))
    .default(null),
});

export const updateTodoSchema = createTodoSchema.partial().extend({
  status: todoStatusSchema.optional(),
});

export const todoQuerySchema = z.object({
  search: z.string().trim().optional(),
  status: z.enum(['all', 'active', 'completed']).optional(),
  priority: z.enum(['all', 'low', 'medium', 'high']).optional(),
  sortBy: z.enum(['createdAt', 'dueDate', 'priority']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
});

export type Todo = z.infer<typeof todoSchema>;
export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
export type TodoQuery = z.infer<typeof todoQuerySchema>;
