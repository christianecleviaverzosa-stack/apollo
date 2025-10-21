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
        href: '/',
      },
      {
        label: 'Role Management',
        icon: UserCog,
        collapsible: true,
        children: [
          { label: 'Super Admin', href: '/' },
          { label: 'Admin', href: '/' },
          { label: 'Manager', href: '/' },
          { label: 'Sales', href: '/' },
        ],
      },
      {
        label: 'Performance Reports',
        icon: BarChart3,
        collapsible: true,
        children: [
          { label: 'Leads Handled', href: '/' },
          { label: 'FTD Reports', href: '/' },
          { label: 'Conversion Stats', href: '/' },
        ],
      },
    ],
  },
  {
    group: 'Leads',
    items: [
      { label: 'All Leads', icon: FileSpreadsheet, href: '/' },
      { label: 'Import Leads', icon: Database, href: '/' },
      { label: 'Lead Assignment', icon: ClipboardList, href: '/' },
      { label: 'FTD Clients', icon: Wallet, href: '/' },
      { label: 'Retention Clients', icon: Users, href: '/' },
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
          { label: 'Open Orders', href: '/' },
          { label: 'Pending Orders', href: '/' },
          { label: 'Closed Orders', href: '/' },
        ],
      },
      {
        label: 'Transaction History',
        icon: Settings,
        collapsible: true,
        children: [
          { label: 'Deposits', href: '/' },
          { label: 'Withdrawals', href: '/' },
          { label: 'Internal Transfers', href: '/' },
        ],
      },
      {
        label: 'Client Trading Summary',
        icon: BarChart3,
        href: '/',
      },
    ],
  },
  {
    group: 'Access & Permissions',
    items: [
      { label: 'Role Access Control', icon: Shield, href: '/' },
      { label: 'Activity Logs', icon: ClipboardList, href: '/' },
      { label: 'Login Sessions', icon: Lock, href: '/' },
    ],
  },
  {
    group: 'System Settings',
    items: [
      {
        label: 'Platform Configuration',
        icon: Settings,
        href: '/',
      },
      {
        label: 'Branding & Whitelabel',
        icon: Settings,
        href: '/',
      },
      {
        label: 'Notification Settings',
        icon: Database,
        href: '/',
      },
      { label: 'API Integrations', icon: Shield, href: '/' },
    ],
  },
];

/* -----------------------------
   🧭 APP SIDEBAR COMPONENT
------------------------------ */
export const AppSidebar = () => {
  return (
    <Sidebar>
      <p className="font-semibold text-xl mx-auto py-6">Megaton Logo</p>
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
