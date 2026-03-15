import { CheckCheck, Clock3, FolderKanban } from 'lucide-react';

import { SectionTitle } from '../components/section-title';
import { StatCard } from '../components/stat-card';
import { TodoForm } from '../components/todo-form';
import { TodoList } from '../components/todo-list';
import { TodoToolbar } from '../components/todo-toolbar';
import { useTodosQuery } from '../hooks/use-todos-query';

export function DashboardPage() {
  const { data: todos = [], isLoading } = useTodosQuery();

  const total = todos.length;
  const completed = todos.filter((todo) => todo.status === 'completed').length;
  const active = total - completed;
  const highPriority = todos.filter((todo) => todo.priority === 'high').length;

  return (
    <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-8 md:px-8 md:py-12">
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <SectionTitle
          eyebrow="Momentum Todo"
          title="A fast, typed workspace for the work that actually matters."
          description="React on the front, Express on the back, typed contracts in the middle. Search, sort, filter, and keep your list moving without a clumsy UI."
        />
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Total"
            value={String(total).padStart(2, '0')}
            hint="Everything in the current view"
          />
          <StatCard
            label="Active"
            value={String(active).padStart(2, '0')}
            hint="Tasks still in motion"
          />
          <StatCard
            label="High"
            value={String(highPriority).padStart(2, '0')}
            hint="Needs close attention"
          />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-sand/70">
            <FolderKanban className="h-4 w-4" />
            Today&apos;s board
          </div>
          <TodoForm />
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="flex items-center gap-3">
              <CheckCheck className="h-5 w-5 text-teal" />
              <h2 className="text-lg font-medium">Completion rate</h2>
            </div>
            <p className="mt-4 text-4xl font-semibold">{total ? Math.round((completed / total) * 100) : 0}%</p>
            <p className="mt-2 text-sm text-sand/65">Based on the current filtered collection.</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="flex items-center gap-3">
              <Clock3 className="h-5 w-5 text-gold" />
              <h2 className="text-lg font-medium">Focus count</h2>
            </div>
            <p className="mt-4 text-4xl font-semibold">{active}</p>
            <p className="mt-2 text-sm text-sand/65">Open tasks remaining in this working set.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <TodoToolbar completedCount={completed} />
        <TodoList todos={todos} isLoading={isLoading} />
      </section>
    </main>
  );
}
