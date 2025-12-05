import { RoutePath } from '@apollo/constants';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

/** Dashboard */
const DashboardPage = lazy(() => import('../pages/dashboard/dashboard-page'));
/** Workers */
const WorkersPage = lazy(() => import('../pages/workers/workers-page'));
const WorkerPage = lazy(() => import('../pages/workers/worker-page'));
const CreateWorkerPage = lazy(
  () => import('../pages/workers/create-worker-page')
);
/** Roles */
const RolePage = lazy(() => import('../pages/roles/role-page'));
const CreateRolePage = lazy(() => import('../pages/roles/create-role-page'));
const RolesPage = lazy(() => import('../pages/roles/roles-page'));
/** Leads */
const LeadsPage = lazy(() => import('../pages/leads/leads-page'));
const LeadPage = lazy(() => import('../pages/leads/lead-page'));
const ImportLeadsPage = lazy(() => import('../pages/leads/import-leads-page'));
/** Orders */
const OrdersPage = lazy(() => import('../pages/orders/orders-page'));
const OrderPage = lazy(() => import('../pages/orders/order-page'));
const CreateOrderPage = lazy(() => import('../pages/orders/create-order-page'));
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
    path: RoutePath.CreateOrder,
    Component: CreateOrderPage,
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
  {
    path: RoutePath.CreateWorker,
    Component: CreateWorkerPage,
  },
  {
    path: RoutePath.Role(':id'),
    Component: RolePage,
  },
  {
    path: RoutePath.CreateRole,
    Component: CreateRolePage,
  },
  {
    path: RoutePath.Roles,
    Component: RolesPage,
  },
];
