import { format, formatDistanceToNowStrict, isPast } from 'date-fns';
import { CalendarDays, Check, Circle, LoaderCircle, Trash2 } from 'lucide-react';
import type { Todo } from '@todo/shared';

import { cn, toDateInputValue } from '@/lib/utils';

import { useTodoMutations } from '../hooks/use-todo-mutations';

const priorityTone = {
  low: 'bg-white/10 text-sand',
  medium: 'bg-gold/20 text-gold',
  high: 'bg-coral/20 text-coral',
} as const;

type TodoListProps = {
  todos: Todo[];
  isLoading: boolean;
};

export function TodoList({ todos, isLoading }: TodoListProps) {
  const { updateTodo, deleteTodo } = useTodoMutations();

  if (isLoading) {
    return (
      <div className="flex min-h-64 items-center justify-center rounded-[2rem] border border-white/10 bg-white/5">
        <LoaderCircle className="h-6 w-6 animate-spin text-sand/70" />
      </div>
    );
  }

  if (!todos.length) {
    return (
      <div className="rounded-[2rem] border border-dashed border-white/15 bg-white/5 p-10 text-center text-sand/70">
        No tasks match the current view. Adjust filters or add a fresh task.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {todos.map((todo, index) => {
        const overdue = todo.status === 'active' && todo.dueDate && isPast(new Date(todo.dueDate));

        return (
          <article
            key={todo.id}
            className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur animate-rise md:grid-cols-[auto_1fr_auto]"
            style={{ animationDelay: `${index * 40}ms` }}
          >
            <button
              type="button"
              className={cn(
                'mt-1 inline-flex h-11 w-11 items-center justify-center rounded-2xl border transition',
                todo.status === 'completed'
                  ? 'border-teal bg-teal text-white'
                  : 'border-white/15 bg-white/5 text-sand/80 hover:border-coral',
              )}
              onClick={() =>
                updateTodo.mutate({
                  id: todo.id,
                  status: todo.status === 'completed' ? 'active' : 'completed',
                })
              }
            >
              {todo.status === 'completed' ? <Check className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
            </button>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h2
                  className={cn(
                    'text-xl font-medium',
                    todo.status === 'completed' && 'text-sand/45 line-through',
                  )}
                >
                  {todo.title}
                </h2>
                <span className={cn('rounded-full px-3 py-1 text-xs font-medium', priorityTone[todo.priority])}>
                  {todo.priority}
                </span>
                {todo.dueDate ? (
                  <span
                    className={cn(
                      'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs',
                      overdue ? 'bg-coral/20 text-coral' : 'bg-white/10 text-sand/70',
                    )}
                  >
                    <CalendarDays className="h-3.5 w-3.5" />
                    {format(new Date(todo.dueDate), 'MMM d')}
                  </span>
                ) : null}
              </div>

              <p className="max-w-3xl text-sm leading-6 text-sand/70">
                {todo.description || 'No notes added yet.'}
              </p>

              <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.18em] text-sand/45">
                <span>Created {formatDistanceToNowStrict(new Date(todo.createdAt), { addSuffix: true })}</span>
                <span>Due input {toDateInputValue(todo.dueDate) || 'none'}</span>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center self-start rounded-2xl border border-white/10 bg-white/5 text-sand/75 transition hover:border-coral hover:text-coral"
              onClick={() => deleteTodo.mutate(todo.id)}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </article>
        );
      })}
    </div>
  );
}
