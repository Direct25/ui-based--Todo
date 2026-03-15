import { Router } from 'express';
import {
  createTodoSchema,
  todoQuerySchema,
  updateTodoSchema,
} from '@todo/shared';

import { asyncHandler } from '../../lib/async-handler';
import { parseOrThrow } from '../../lib/parse';
import { todoService } from './todo.service';

export const todoRouter = Router();

todoRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const query = parseOrThrow(todoQuerySchema, req.query);
    const todos = await todoService.list(query);
    res.json({ todos });
  }),
);

todoRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const input = parseOrThrow(createTodoSchema, req.body);
    const todo = await todoService.create(input);
    res.status(201).json({ todo });
  }),
);

todoRouter.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const input = parseOrThrow(updateTodoSchema, req.body);
    const todo = await todoService.update(req.params.id, input);
    res.json({ todo });
  }),
);

todoRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    await todoService.remove(req.params.id);
    res.status(204).send();
  }),
);

todoRouter.delete(
  '/',
  asyncHandler(async (_req, res) => {
    const result = await todoService.clearCompleted();
    res.json(result);
  }),
);
