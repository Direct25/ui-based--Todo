import type { CreateTodoInput, Todo, TodoQuery, UpdateTodoInput } from '@todo/shared';

const apiBaseUrl =
  import.meta.env.VITE_API_URL ?? (import.meta.env.PROD ? '/api' : 'http://localhost:4000/api');

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(payload?.message ?? 'Request failed');
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export const todoApi = {
  list(query: TodoQuery) {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    return request<{ todos: Todo[] }>(`/todos?${params.toString()}`);
  },
  create(input: CreateTodoInput) {
    return request<{ todo: Todo }>('/todos', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },
  update(id: string, input: UpdateTodoInput) {
    return request<{ todo: Todo }>(`/todos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(input),
    });
  },
  remove(id: string) {
    return request<void>(`/todos/${id}`, {
      method: 'DELETE',
    });
  },
  clearCompleted() {
    return request<{ removed: number }>('/todos', {
      method: 'DELETE',
    });
  },
};
