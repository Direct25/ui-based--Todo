# Momentum Todo

A modern full-stack todo app built as a clean monorepo with React, Vite, TypeScript, Node.js, and Express.

## Stack

- `pnpm` workspaces
- React 19 + Vite + TypeScript
- Tailwind CSS
- TanStack Query
- Zustand
- Node.js + Express + TypeScript
- Shared Zod schemas for typed contracts

## Structure

```text
.
|-- apps
|   |-- api
|   |   |-- data
|   |   `-- src
|   `-- web
|       `-- src
|-- packages
|   `-- shared
|       `-- src
|-- package.json
`-- pnpm-workspace.yaml
```

## Run

1. Install dependencies:

```bash
pnpm install
```

2. Optional: copy env examples if you want custom ports or origins.

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

3. Start both apps:

```bash
pnpm dev
```

4. Open `http://localhost:5173`

The API runs on `http://localhost:4000` by default.

## Key Features

- Typed API contract shared between frontend and backend
- Search, status filter, priority filter, sorting, and clear-completed flow
- File-based persistence for quick local development
- Structured feature folders for growth beyond a demo
