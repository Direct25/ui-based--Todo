import { useState, useTransition } from 'react';
import { ChevronDown, LoaderCircle, Plus } from 'lucide-react';

import { fromDateInputValue } from '@/lib/utils';

import { useTodoMutations } from '../hooks/use-todo-mutations';

type TodoFormState = {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
};

const initialForm: TodoFormState = {
  title: '',
  description: '',
  priority: 'medium',
  dueDate: '',
};

export function TodoForm() {
  const { createTodo } = useTodoMutations();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState(initialForm);

  const isBusy = isPending || createTodo.isPending;

  return (
    <form
      className="grid gap-4 rounded-[2rem] border border-white/10 bg-sand p-5 text-ink shadow-panel md:grid-cols-[1.4fr_1fr]"
      onSubmit={(event) => {
        event.preventDefault();

        startTransition(() => {
          createTodo.mutate(
            {
              title: form.title,
              description: form.description,
              priority: form.priority,
              dueDate: fromDateInputValue(form.dueDate),
            },
            {
              onSuccess: () => setForm(initialForm),
            },
          );
        });
      }}
    >
      <div className="space-y-3">
        <div>
          <label className="mb-2 block text-sm font-medium">Task title</label>
          <input
            className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none transition focus:border-coral"
            placeholder="Design sprint recap deck"
            value={form.title}
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
            maxLength={120}
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Notes</label>
          <textarea
            className="min-h-28 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none transition focus:border-coral"
            placeholder="Add a clear outcome, next owner, and deadline."
            value={form.description}
            onChange={(event) =>
              setForm((current) => ({ ...current, description: event.target.value }))
            }
            maxLength={280}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Priority</label>
          <label className="relative block">
            <select
              className="w-full appearance-none rounded-2xl border border-ink/10 bg-white px-4 py-3 pr-11 outline-none transition focus:border-coral"
              value={form.priority}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  priority: event.target.value as 'low' | 'medium' | 'high',
                }))
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50" />
          </label>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Due date</label>
          <input
            type="date"
            className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none transition focus:border-coral"
            value={form.dueDate}
            onChange={(event) => setForm((current) => ({ ...current, dueDate: event.target.value }))}
          />
        </div>
        <button
          type="submit"
          disabled={isBusy || !form.title.trim()}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-ink px-4 py-3 text-sm font-medium text-white transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isBusy ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          Add task
        </button>
      </div>
    </form>
  );
}
