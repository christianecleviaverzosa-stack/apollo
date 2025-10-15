import { RoutePath } from '@apollo/constants';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const DashboardPage = lazy(() => import('../pages/dashboard/dashboard-page'));

export const authRoutes: RouteObject[] = [
  {
    path: RoutePath.Dashboard,
    Component: DashboardPage,
  },
];
