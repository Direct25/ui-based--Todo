import { useQuery } from '@tanstack/react-query';
import { useDeferredValue } from 'react';

import { todoApi } from '@/lib/api';

import { useTodoFiltersStore } from '../store/todo-filters-store';

export function useTodosQuery() {
  const search = useTodoFiltersStore((state) => state.search);
  const deferredSearch = useDeferredValue(search);
  const status = useTodoFiltersStore((state) => state.status);
  const priority = useTodoFiltersStore((state) => state.priority);
  const sortBy = useTodoFiltersStore((state) => state.sortBy);
  const order = useTodoFiltersStore((state) => state.order);

  return useQuery({
    queryKey: ['todos', deferredSearch, status, priority, sortBy, order],
    queryFn: () =>
      todoApi.list({
        search: deferredSearch,
        status,
        priority,
        sortBy,
        order,
      }),
    select: (data) => data.todos,
  });
}
