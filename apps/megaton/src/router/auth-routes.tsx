import { RoutePath } from '@apollo/constants';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const DashboardPage = lazy(() => import('../pages/dashboard/dashboard-page'));
const WorkersPage = lazy(() => import('../pages/workers/workers-page'));
const LeadsPage = lazy(() => import('../pages/leads/leads-page'));
const LeadPage = lazy(() => import('../pages/leads/lead-page'));

export const authRoutes: RouteObject[] = [
  {
    path: RoutePath.Dashboard,
    Component: DashboardPage,
  },
  {
    path: RoutePath.Workers,
    Component: WorkersPage,
  },
  {
    path: RoutePath.Leads,
    Component: LeadsPage,
  },
  {
    path: RoutePath.Lead,
    Component: LeadPage,
  },
];
