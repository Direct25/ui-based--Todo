import cors from 'cors';
import express from 'express';

import { config } from './config.js';
import { todoRouter } from './features/todos/todo.routes.js';
import { HttpError } from './lib/http-error.js';

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: (origin, callback) => {
        if (config.appOrigins.length === 0) {
          callback(null, true);
          return;
        }

        if (!origin || config.appOrigins.includes(origin)) {
          callback(null, true);
          return;
        }

        callback(new HttpError(403, `Origin ${origin} is not allowed by CORS`));
      },
    }),
  );
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.use('/api/todos', todoRouter);

  app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
      return;
    }

    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  });

  return app;
}
