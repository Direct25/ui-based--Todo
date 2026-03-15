import { ArrowDownUp, ChevronDown, RotateCcw, Search, Trash2 } from 'lucide-react';

import { useTodoMutations } from '../hooks/use-todo-mutations';
import { useTodoFiltersStore } from '../store/todo-filters-store';

type TodoToolbarProps = {
  completedCount: number;
};

export function TodoToolbar({ completedCount }: TodoToolbarProps) {
  const { clearCompleted } = useTodoMutations();
  const {
    search,
    status,
    priority,
    sortBy,
    setSearch,
    setStatus,
    setPriority,
    setSortBy,
    toggleOrder,
    reset,
  } = useTodoFiltersStore();

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="grid gap-3 lg:grid-cols-[1.5fr_repeat(4,minmax(0,1fr))]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sand/50" />
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-sand/40 focus:border-coral"
            placeholder="Search tasks or notes"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
        <label className="relative block">
          <select
            className="w-full appearance-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 pr-11 text-sm text-white outline-none transition focus:border-coral"
            value={status}
            onChange={(event) => setStatus(event.target.value as 'all' | 'active' | 'completed')}
          >
            <option value="all">All status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sand/70" />
        </label>
        <label className="relative block">
          <select
            className="w-full appearance-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 pr-11 text-sm text-white outline-none transition focus:border-coral"
            value={priority}
            onChange={(event) =>
              setPriority(event.target.value as 'all' | 'low' | 'medium' | 'high')
            }
          >
            <option value="all">All priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sand/70" />
        </label>
        <label className="relative block">
          <select
            className="w-full appearance-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 pr-11 text-sm text-white outline-none transition focus:border-coral"
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value as 'createdAt' | 'dueDate' | 'priority')
            }
          >
            <option value="createdAt">Newest</option>
            <option value="dueDate">Due date</option>
            <option value="priority">Priority</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sand/70" />
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:bg-white/10"
            onClick={() => toggleOrder()}
          >
            <ArrowDownUp className="h-4 w-4" />
            Order
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:bg-white/10"
            onClick={() => reset()}
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            type="button"
            disabled={!completedCount || clearCompleted.isPending}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-coral px-4 py-3 text-sm text-white transition hover:bg-coral/90 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => clearCompleted.mutate()}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
