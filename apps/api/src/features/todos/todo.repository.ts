import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Todo } from '@todo/shared';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);
const dataFilePath = path.resolve(currentDirectory, '../../data/todos.json');

class TodoRepository {
  private writeQueue = Promise.resolve();

  private async ensureDataFile() {
    try {
      await fs.access(dataFilePath);
    } catch {
      await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
      await fs.writeFile(dataFilePath, '[]', 'utf8');
    }
  }

  async list() {
    await this.ensureDataFile();
    const file = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(file) as Todo[];
  }

  async save(todos: Todo[]) {
    await this.ensureDataFile();
    this.writeQueue = this.writeQueue.then(() =>
      fs.writeFile(dataFilePath, JSON.stringify(todos, null, 2), 'utf8'),
    );

    await this.writeQueue;
  }
}

export const todoRepository = new TodoRepository();
