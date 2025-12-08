export const RoutePath = {
  Login: '/',
  Dashboard: '/dashboard',
  /** Workers */
  Workers: '/workers',
  Worker: '/workers/:id',
  CreateWorker: '/create/worker',
  /** Roles */
  Roles: '/roles',
  Role: (id: string) => `/roles/${id}`,
  CreateRole: '/create/role',
  /** Leads */
  Leads: '/leads',
  Lead: (id: string) => `/leads/${id}`,
  ImportLeads: '/import-leads',
  FTDClients: '/ftd-clients',
  FTDClient: '/ftd-clients/:id',
  RetentionClients: '/retention-clients',
  RetentionClient: '/retention-clients/:id',
  LeadsAssignment: '/leads-assignment',
  /** Orders */
  Orders: '/orders',
  CreateOrder: '/create/order',
  Order: (id: string) => `/orders/${id}`,
  /** Transactions */
  Deposits: '/deposits',
  Deposit: '/deposits/:id',
  Withdrawals: '/withdrawals',
  Withdrawal: (id: string) => `/withdrawals/${id}`,
  InternalTransfers: '/internal-transfers',
  InternalTransfer: (id: string) => `/internal-transfers/${id}`
};
