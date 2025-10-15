import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import App from '../app';
import { Suspense } from 'react';
import { unAuthRoutes } from './un-auth-routes';
import { authRoutes } from './auth-routes';
import { AuthLayout, UnAuthLayout } from '@apollo/features';
import { RoutePath } from '@apollo/constants';

const routes: RouteObject[] = [
  {
    path: RoutePath.Login,
    Component: App,
    errorElement: (
      <Suspense>
        <p>[something went wrong]</p>
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
