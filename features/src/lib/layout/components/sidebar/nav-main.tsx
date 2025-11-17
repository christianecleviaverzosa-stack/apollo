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
  {
    group: 'General',
    items: [
      {
        label: 'Dashboard',
        icon: Home,
        href: '/dashboard',
      },
    ],
  },
  {
    group: 'Workers',
    items: [
      {
        label: 'All Workers',
        icon: Users,
        href: RoutePath.Workers,
      },
      {
        label: 'Role Management',
        icon: UserCog,
        collapsible: true,
        children: [
          { label: 'Super Admin', href: RoutePath.Login },
          { label: 'Admin', href: RoutePath.Login },
          { label: 'Manager', href: RoutePath.Login },
          { label: 'Sales', href: RoutePath.Login },
        ],
      },
      {
        label: 'Performance Reports',
        icon: BarChart3,
        collapsible: true,
        children: [
          { label: 'Leads Handled', href: RoutePath.Login },
          { label: 'FTD Reports', href: RoutePath.Login },
          { label: 'Conversion Stats', href: RoutePath.Login },
        ],
      },
    ],
  },
  {
    group: 'Leads',
    items: [
      { label: 'All Leads', icon: FileSpreadsheet, href: RoutePath.Leads },
      { label: 'Import Leads', icon: Database, href: RoutePath.ImportLeads },
      { label: 'Lead Assignment', icon: ClipboardList, href: RoutePath.Login },
      { label: 'FTD Clients', icon: Wallet, href: RoutePath.FTDClients },
      { label: 'Retention Clients', icon: Users, href: RoutePath.RetentionClients },
    ],
  },
  {
    group: 'Trading Activity',
    items: [
      { label: 'All Orders', icon: BadgeDollarSign, href: RoutePath.Orders },
      {
        label: 'Transaction History',
        icon: Settings,
        collapsible: true,
        children: [
          { label: 'Deposits', href: RoutePath.Login },
          { label: 'Withdrawals', href: RoutePath.Login },
          { label: 'Internal Transfers', href: RoutePath.Login },
        ],
      },
      {
        label: 'Client Trading Summary',
        icon: BarChart3,
        href: RoutePath.Login,
      },
    ],
  },
  {
    group: 'Access & Permissions',
    items: [
      { label: 'Role Access Control', icon: Shield, href: RoutePath.Login },
      { label: 'Activity Logs', icon: ClipboardList, href: RoutePath.Login },
      { label: 'Login Sessions', icon: Lock, href: RoutePath.Login },
    ],
  },
  {
    group: 'System Settings',
    items: [
      {
        label: 'Platform Configuration',
        icon: Settings,
        href: RoutePath.Login,
      },
      {
        label: 'Notification Settings',
        icon: Database,
        href: RoutePath.Login,
      },
      { label: 'API Integrations', icon: Shield, href: RoutePath.Login },
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
