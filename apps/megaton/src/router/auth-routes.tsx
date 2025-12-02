import { RoutePath } from '@apollo/constants';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

/** Dashboard */
const DashboardPage = lazy(() => import('../pages/dashboard/dashboard-page'));
/** Workers */
const WorkersPage = lazy(() => import('../pages/workers/workers-page'));
const WorkerPage = lazy(() => import('../pages/workers/worker-page'));
/** Roles */
const SuperAdminPage = lazy(() => import('../pages/roles/super-admin-page'));
const AdminPage = lazy(() => import('../pages/roles/admin-page'));
const SalesPage = lazy(() => import('../pages/roles/sales-page'));
const ManagerPage = lazy(() => import('../pages/roles/manager-page'));
/** Leads */
const LeadsPage = lazy(() => import('../pages/leads/leads-page'));
const LeadPage = lazy(() => import('../pages/leads/lead-page'));
const ImportLeadsPage = lazy(() => import('../pages/leads/import-leads-page'));
/** Orders */
const OrdersPage = lazy(() => import('../pages/orders/orders-page'));
const OrderPage = lazy(() => import('../pages/orders/order-page'));
const DepositsPage = lazy(
  () => import('../pages/transaction-history/deposits-page')
);
const DepositPage = lazy(
  () => import('../pages/transaction-history/deposit-page')
);
/** Leads */
const FTDClientsPage = lazy(() => import('../pages/ftd/ftd-clients-page'));
const FTDClientPage = lazy(() => import('../pages/ftd/ftd-client-page'));
const RetentionClientsPage = lazy(
  () => import('../pages/retention/retention-clients-page')
);
const RetentionClientPage = lazy(
  () => import('../pages/retention/retention-client-page')
);
const LeadsAssignmentPage = lazy(
  () => import('../pages/leads/leads-assignment-page')
);

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
    path: RoutePath.Lead(':id'),
    Component: LeadPage,
  },
  {
    path: RoutePath.ImportLeads,
    Component: ImportLeadsPage,
  },
  {
    path: RoutePath.Orders,
    Component: OrdersPage,
  },
  {
    path: RoutePath.Order,
    Component: OrderPage,
  },
  {
    path: RoutePath.FTDClients,
    Component: FTDClientsPage,
  },
  {
    path: RoutePath.FTDClient,
    Component: FTDClientPage,
  },
  {
    path: RoutePath.RetentionClients,
    Component: RetentionClientsPage,
  },
  {
    path: RoutePath.RetentionClient,
    Component: RetentionClientPage,
  },
  {
    path: RoutePath.LeadsAssignment,
    Component: LeadsAssignmentPage,
  },
  {
    path: RoutePath.SuperAdminRole,
    Component: SuperAdminPage,
  },
  {
    path: RoutePath.AdminRole,
    Component: AdminPage,
  },
  {
    path: RoutePath.SalesRole,
    Component: SalesPage,
  },
  {
    path: RoutePath.ManagerRole,
    Component: ManagerPage,
  },
  {
    path: RoutePath.Worker,
    Component: WorkerPage,
  },
  {
    path: RoutePath.Deposits,
    Component: DepositsPage,
  },
  {
    path: RoutePath.Deposit,
    Component: DepositPage,
  },
];
