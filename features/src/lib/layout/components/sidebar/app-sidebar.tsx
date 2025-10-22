// TODO: Needs improvement, placeholder for now. Sidebar nav items must be on app level.

import * as React from 'react';
import {
  Home,
  Users,
  UserCog,
  BarChart3,
  ChevronRight,
  FileSpreadsheet,
  Settings,
  Shield,
  Database,
  Wallet,
  ClipboardList,
  LineChart,
  Lock,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@apollo/ui';
import { RoutePath } from '@apollo/constants';

// TODO: Improve type, find a way to move values to app level (settings to avoid circular)
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
      { label: 'All Leads', icon: FileSpreadsheet, href: RoutePath.Login },
      { label: 'Import Leads', icon: Database, href: RoutePath.Login },
      { label: 'Lead Assignment', icon: ClipboardList, href: RoutePath.Login },
      { label: 'FTD Clients', icon: Wallet, href: RoutePath.Login },
      { label: 'Retention Clients', icon: Users, href: RoutePath.Login },
    ],
  },
  {
    group: 'Trading Activity',
    items: [
      {
        label: 'Live Orders',
        icon: LineChart,
        collapsible: true,
        children: [
          { label: 'Open Orders', href: RoutePath.Login },
          { label: 'Pending Orders', href: RoutePath.Login },
          { label: 'Closed Orders', href: RoutePath.Login },
        ],
      },
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
        label: 'Branding & Whitelabel',
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

export const AppSidebar = () => {
  return (
    <Sidebar>
      <h2 className="font-semibold text-xl mx-auto py-6 text-foreground">
        Megaton
      </h2>
      <SidebarContent>
        {navLinks.map((group) => (
          <SidebarGroup key={group.group}>
            <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) =>
                item.collapsible && item.children ? (
                  <Collapsible key={item.label} className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          {item.icon && <item.icon className="h-4 w-4" />}
                          <span>{item.label}</span>
                          <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.children.map((child) => (
                            <SidebarMenuSubItem key={child.label}>
                              <SidebarMenuButton asChild>
                                <a href={child.href || '#'}>
                                  <span>{child.label}</span>
                                </a>
                              </SidebarMenuButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <a href={item.href || '#'}>
                        {item.icon && <item.icon className="h-4 w-4" />}
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};
