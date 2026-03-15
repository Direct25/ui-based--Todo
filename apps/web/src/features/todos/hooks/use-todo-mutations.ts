import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateTodoInput, UpdateTodoInput } from '@todo/shared';

import { todoApi } from '@/lib/api';

type UpdateTodoMutationInput = UpdateTodoInput & {
  id: string;
};

export function useTodoMutations() {
  const queryClient = useQueryClient();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['todos'] });

  const createTodo = useMutation({
    mutationFn: (input: CreateTodoInput) => todoApi.create(input),
    onSuccess: invalidate,
  });

  const updateTodo = useMutation({
    mutationFn: ({ id, ...input }: UpdateTodoMutationInput) =>
      todoApi.update(id, input),
    onSuccess: invalidate,
  });

  const deleteTodo = useMutation({
    mutationFn: todoApi.remove,
    onSuccess: invalidate,
  });

  const clearCompleted = useMutation({
    mutationFn: todoApi.clearCompleted,
    onSuccess: invalidate,
  });

  return {
    createTodo,
    updateTodo,
    deleteTodo,
    clearCompleted,
  };
}
