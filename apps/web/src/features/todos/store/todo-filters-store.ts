import { create } from 'zustand';

import type { FilterPriority, FilterStatus, SortBy } from '../types';

type TodoFiltersState = {
  search: string;
  status: FilterStatus;
  priority: FilterPriority;
  sortBy: SortBy;
  order: 'asc' | 'desc';
  setSearch: (value: string) => void;
  setStatus: (value: FilterStatus) => void;
  setPriority: (value: FilterPriority) => void;
  setSortBy: (value: SortBy) => void;
  toggleOrder: () => void;
  reset: () => void;
};

const defaultState = {
  search: '',
  status: 'all' as FilterStatus,
  priority: 'all' as FilterPriority,
  sortBy: 'createdAt' as SortBy,
  order: 'desc' as const,
};

export const useTodoFiltersStore = create<TodoFiltersState>((set) => ({
  ...defaultState,
  setSearch: (search) => set({ search }),
  setStatus: (status) => set({ status }),
  setPriority: (priority) => set({ priority }),
  setSortBy: (sortBy) => set({ sortBy }),
  toggleOrder: () =>
    set((state) => ({
      order: state.order === 'asc' ? 'desc' : 'asc',
    })),
  reset: () => set(defaultState),
}));
