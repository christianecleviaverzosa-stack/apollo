import {
  createBrowserRouter,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import App from '../app';
import { Suspense } from 'react';
import { unAuthRoutes } from './un-auth-routes';
import { authRoutes } from './auth-routes';

// TODO: Move to features
const AuthLayout = () => {
  return <Outlet />;
};

// TODO: Move to features
const UnAuthLayout = () => {
  return <Outlet />;
};

const routes: RouteObject[] = [
  {
    path: '/',
    Component: App,
    errorElement: (
      <Suspense>
        <p>something went wrong</p>
      </Suspense>
    ),
    children: [
      {
        element: <UnAuthLayout />,
        children: unAuthRoutes,
      },
      {
        element: <AuthLayout />,
        children: authRoutes,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
