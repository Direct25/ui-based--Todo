import { nanoid } from 'nanoid';

import type { CreateTodoInput, Todo, TodoQuery, UpdateTodoInput } from '@todo/shared';

import { HttpError } from '../../lib/http-error';
import { todoRepository } from './todo.repository';

const priorityRank = {
  low: 1,
  medium: 2,
  high: 3,
} as const;

function applyQuery(todos: Todo[], query: TodoQuery) {
  const search = query.search?.toLowerCase();
  const status = query.status ?? 'all';
  const priority = query.priority ?? 'all';
  const sortBy = query.sortBy ?? 'createdAt';
  const order = query.order ?? 'desc';

  const filtered = todos.filter((todo) => {
    const matchesSearch =
      !search ||
      todo.title.toLowerCase().includes(search) ||
      todo.description.toLowerCase().includes(search);
    const matchesStatus = status === 'all' || todo.status === status;
    const matchesPriority = priority === 'all' || todo.priority === priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return filtered.sort((left, right) => {
    const direction = order === 'asc' ? 1 : -1;

    if (sortBy === 'priority') {
      return (priorityRank[left.priority] - priorityRank[right.priority]) * direction;
    }

    if (sortBy === 'dueDate') {
      const leftValue = left.dueDate ? new Date(left.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
      const rightValue = right.dueDate
        ? new Date(right.dueDate).getTime()
        : Number.MAX_SAFE_INTEGER;

      return (leftValue - rightValue) * direction;
    }

    return (
      (new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime()) * direction
    );
  });
}

export const todoService = {
  async list(query: TodoQuery) {
    const todos = await todoRepository.list();
    return applyQuery(todos, query);
  },

  async create(input: CreateTodoInput) {
    const todos = await todoRepository.list();
    const now = new Date().toISOString();

    const todo: Todo = {
      id: nanoid(),
      title: input.title,
      description: input.description ?? '',
      priority: input.priority ?? 'medium',
      status: 'active',
      dueDate: input.dueDate ?? null,
      createdAt: now,
      updatedAt: now,
    };

    const nextTodos = [todo, ...todos];
    await todoRepository.save(nextTodos);
    return todo;
  },

  async update(id: string, input: UpdateTodoInput) {
    const todos = await todoRepository.list();
    const current = todos.find((todo) => todo.id === id);

    if (!current) {
      throw new HttpError(404, 'Todo not found');
    }

    const updated: Todo = {
      ...current,
      ...input,
      description: input.description ?? current.description,
      dueDate: input.dueDate === undefined ? current.dueDate : input.dueDate,
      updatedAt: new Date().toISOString(),
    };

    await todoRepository.save(todos.map((todo) => (todo.id === id ? updated : todo)));
    return updated;
  },

  async remove(id: string) {
    const todos = await todoRepository.list();
    const nextTodos = todos.filter((todo) => todo.id !== id);

    if (nextTodos.length === todos.length) {
      throw new HttpError(404, 'Todo not found');
    }

    await todoRepository.save(nextTodos);
  },

  async clearCompleted() {
    const todos = await todoRepository.list();
    const nextTodos = todos.filter((todo) => todo.status !== 'completed');
    await todoRepository.save(nextTodos);

    return {
      removed: todos.length - nextTodos.length,
    };
  },
};
