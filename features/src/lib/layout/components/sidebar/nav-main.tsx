import {
  Home,
  Users,
  UserCog,
  FileSpreadsheet,
  Database,
  ClipboardList,
  Wallet,
  Settings,
  Shield,
  Lock,
  ChevronRight,
  BadgeDollarSign,
} from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@apollo/ui';

import { RoutePath } from '@apollo/constants';
import { useTranslation } from 'react-i18next';

type NavChild = {
  label: string;
  href?: string;
};

type NavItem = {
  label?: string;
  icon?: React.ElementType;
  href?: string;
  collapsible?: boolean;
  children?: NavChild[];
};

type NavGroup = {
  group: string;
  items: NavItem[];
};

export const NavMain = () => {
  const { t } = useTranslation('components/nav-main');

  const navLinks: NavGroup[] = [
    /** General */
    {
      group: t('general'),
      items: [{ label: t('dashboard'), icon: Home, href: RoutePath.Dashboard }],
    },
    /** Trading */
    {
      group: t('trading_activity'),
      items: [
        {
          label: t('order_management.label'),
          icon: BadgeDollarSign,
          collapsible: true,
          children: [
            { label: t('order_management.all_orders'), href: RoutePath.Orders },
            {
              label: t('order_management.create_manual_order'),
              href: RoutePath.CreateOrder,
            },
          ],
        },
        {
          label: t('transaction_history.label'),
          icon: ClipboardList,
          collapsible: true,
          children: [
            {
              label: t('transaction_history.deposits'),
              href: RoutePath.Deposits,
            },
            {
              label: t('transaction_history.withdrawals'),
              href: RoutePath.Withdrawals,
            },
            {
              label: t('transaction_history.internal_transfers'),
              href: RoutePath.InternalTransfers,
            },
          ],
        },
      ],
    },
    /** Leads */
    {
      group: t('leads'),
      items: [
        { label: t('all_leads'), icon: FileSpreadsheet, href: RoutePath.Leads },
        {
          label: t('import_leads'),
          icon: Database,
          href: RoutePath.ImportLeads,
        },
        {
          label: t('leads_assignment'),
          icon: ClipboardList,
          href: RoutePath.LeadsAssignment,
        },
        { label: t('ftd_clients'), icon: Wallet, href: RoutePath.FTDClients },
        {
          label: t('retention_clients'),
          icon: Users,
          href: RoutePath.RetentionClients,
        },
      ],
    },
    /** Workers */
    {
      group: t('workers'),
      items: [
        {
          label: t('worker_management.label'),
          icon: Users,
          collapsible: true,
          children: [
            {
              label: t('worker_management.all_workers'),
              href: RoutePath.Workers,
            },
            {
              label: t('worker_management.create_worker'),
              href: RoutePath.CreateWorker,
            },
          ],
        },

        {
          label: t('roles_permissions.label'),
          icon: UserCog,
          collapsible: true,
          children: [
            { label: t('roles_permissions.roles'), href: RoutePath.Roles },
            {
              label: t('roles_permissions.create_role'),
              href: RoutePath.CreateRole,
            },
            { label: 'Admin', href: RoutePath.Role('admin') },
            { label: 'Manager', href: RoutePath.Role('manager') },
            { label: 'Sales', href: RoutePath.Role('sales') },
          ],
        },
      ],
    },
    /** Access & Audit */
    {
      group: t('access_permissions'),
      items: [
        {
          label: t('activity_logs'),
          icon: ClipboardList,
          href: RoutePath.Dashboard,
        },
        { label: t('login_sessions'), icon: Lock, href: RoutePath.Dashboard },
      ],
    },
    /** System */
    {
      group: t('system_settings'),
      items: [
        {
          label: t('platform_configuration'),
          icon: Settings,
          href: RoutePath.Dashboard,
        },
        {
          label: t('notification_settings'),
          icon: Database,
          href: RoutePath.Dashboard,
        },
        {
          label: t('api_integrations'),
          icon: Shield,
          href: RoutePath.Dashboard,
        },
      ],
    },
  ];

  return navLinks.map((group) => (
    <SidebarGroup key={group.group}>
      <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
      <SidebarMenu>
        {group.items.map((item) =>
          item.collapsible && item.children ? (
            <Collapsible key={item.label} asChild className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.label}>
                    {item.icon && <item.icon className="size-4" />}
                    <span>{item.label}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.children.map((child) => (
                      <SidebarMenuSubItem key={child.label}>
                        <SidebarMenuSubButton asChild>
                          <a href={child.href}>{child.label}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild tooltip={item.label}>
                <a href={item.href}>
                  {item.icon && <item.icon className="size-4" />}
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  ));
};
