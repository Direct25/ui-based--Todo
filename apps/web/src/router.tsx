import { createBrowserRouter } from 'react-router-dom';

import { AppShell } from './shell/app-shell';
import { DashboardPage } from './features/todos/pages/dashboard-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
    ],
  },
]);
