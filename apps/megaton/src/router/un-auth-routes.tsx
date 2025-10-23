import { Backdrop } from '@apollo/ui';
import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

const LoginPage = lazy(() => import('../pages/login/login-page'));

export const unAuthRoutes: RouteObject[] = [
  {
    index: true,
    Component: () => (
      <Suspense fallback={<Backdrop />}>
        <LoginPage />
      </Suspense>
    ),
  },
];
