import { Router } from 'express';
import type { Request, Response } from 'express';
import {
  createTodoSchema,
  todoQuerySchema,
  updateTodoSchema,
} from '@todo/shared';

import { asyncHandler } from '../../lib/async-handler.js';
import { parseOrThrow } from '../../lib/parse.js';
import { todoService } from './todo.service.js';

export const todoRouter = Router();

todoRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const query = parseOrThrow(todoQuerySchema, req.query);
    const todos = await todoService.list(query);
    res.json({ todos });
  }),
);

todoRouter.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const input = parseOrThrow(createTodoSchema, req.body);
    const todo = await todoService.create(input);
    res.status(201).json({ todo });
  }),
);

todoRouter.patch(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const input = parseOrThrow(updateTodoSchema, req.body);
    const todo = await todoService.update(id, input);
    res.json({ todo });
  }),
);

todoRouter.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await todoService.remove(id);
    res.status(204).send();
  }),
);

todoRouter.delete(
  '/',
  asyncHandler(async (_req: Request, res: Response) => {
    const result = await todoService.clearCompleted();
    res.json(result);
  }),
);
