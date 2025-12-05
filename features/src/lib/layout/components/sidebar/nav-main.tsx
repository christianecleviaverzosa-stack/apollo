import {
  Home,
  Users,
  UserCog,
  BarChart3,
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

type NavChild = {
  label: string;
  href?: string;
};

type NavItem = {
  label: string;
  icon?: React.ElementType;
  href?: string;
  collapsible?: boolean;
  children?: NavChild[];
};

type NavGroup = {
  group: string;
  items: NavItem[];
};

const navLinks: NavGroup[] = [
  // ----------------------------------------------------
  // GENERAL
  // ----------------------------------------------------
  {
    group: 'General',
    items: [{ label: 'Dashboard', icon: Home, href: RoutePath.Dashboard }],
  },

  // ----------------------------------------------------
  // TRADING
  // ----------------------------------------------------
  {
    group: 'Trading Activity',
    items: [
      {
        label: 'Order Management',
        icon: BadgeDollarSign,
        collapsible: true,
        children: [
          { label: 'All Orders', href: RoutePath.Orders },
          { label: 'Create Manual Order', href: RoutePath.CreateOrder },
        ],
      },
      {
        label: 'Transaction History',
        icon: ClipboardList,
        collapsible: true,
        children: [
          { label: 'Deposits', href: RoutePath.Deposits },
          { label: 'Withdrawals', href: RoutePath.Dashboard },
          { label: 'Internal Transfers', href: RoutePath.Dashboard },
        ],
      },
      {
        label: 'Client Trading Summary',
        icon: BarChart3,
        href: RoutePath.Dashboard,
      },
    ],
  },

  // ----------------------------------------------------
  // LEADS
  // ----------------------------------------------------
  {
    group: 'Leads',
    items: [
      { label: 'All Leads', icon: FileSpreadsheet, href: RoutePath.Leads },
      { label: 'Import Leads', icon: Database, href: RoutePath.ImportLeads },
      {
        label: 'Lead Assignment',
        icon: ClipboardList,
        href: RoutePath.LeadsAssignment,
      },
      { label: 'FTD Clients', icon: Wallet, href: RoutePath.FTDClients },
      {
        label: 'Retention Clients',
        icon: Users,
        href: RoutePath.RetentionClients,
      },
    ],
  },

  // ----------------------------------------------------
  // WORKERS
  // ----------------------------------------------------
  {
    group: 'Workers',
    items: [
      {
        label: 'Worker Management',
        icon: Users,
        collapsible: true,
        children: [
          { label: 'All Workers', href: RoutePath.Workers },
          { label: 'Create Worker', href: RoutePath.CreateWorker },
        ],
      },

      {
        label: 'Roles & Permissions',
        icon: UserCog,
        collapsible: true,
        children: [
          { label: 'Roles', href: RoutePath.Roles },
          { label: 'Create Role', href: RoutePath.CreateRole },
          { label: 'Admin', href: RoutePath.Role('admin') },
          { label: 'Manager', href: RoutePath.Role('manager') },
          { label: 'Sales', href: RoutePath.Role('sales') },
        ],
      },
      {
        label: 'Performance Reports',
        icon: BarChart3,
        collapsible: true,
        children: [
          { label: 'Leads Performance', href: RoutePath.Dashboard },
          { label: 'FTD Reports', href: RoutePath.Dashboard },
          { label: 'Conversion Stats', href: RoutePath.Dashboard },
        ],
      },
    ],
  },

  // ----------------------------------------------------
  // ACCESS / AUDIT
  // ----------------------------------------------------
  {
    group: 'Access & Permissions',
    items: [
      { label: 'Role Access Control', icon: Shield, href: RoutePath.Dashboard },
      {
        label: 'Activity Logs',
        icon: ClipboardList,
        href: RoutePath.Dashboard,
      },
      { label: 'Login Sessions', icon: Lock, href: RoutePath.Dashboard },
    ],
  },

  // ----------------------------------------------------
  // SYSTEM
  // ----------------------------------------------------
  {
    group: 'System Settings',
    items: [
      {
        label: 'Platform Configuration',
        icon: Settings,
        href: RoutePath.Dashboard,
      },
      {
        label: 'Notification Settings',
        icon: Database,
        href: RoutePath.Dashboard,
      },
      { label: 'API Integrations', icon: Shield, href: RoutePath.Dashboard },
    ],
  },
];

export const NavMain = () => {
  return (
    <>
      {navLinks.map((group) => (
        <SidebarGroup key={group.group}>
          <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
          <SidebarMenu>
            {group.items.map((item) =>
              item.collapsible && item.children ? (
                <Collapsible
                  key={item.label}
                  asChild
                  className="group/collapsible"
                >
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
      ))}
    </>
  );
};
