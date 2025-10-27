// TODO: Needs improvement, placeholder for now. Sidebar nav items must be on app level.

import * as React from 'react';
import { Atom } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
} from '@apollo/ui';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex flex-row">
        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
          <Atom className="size-5" />
        </div>
        <div className="grid text-left text-sm leading-tight">
          <span className="truncate font-medium">Megaton</span>
          <span className="truncate text-xs">Admin</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: 'John Doe',
            email: 'john.doe@example.com',
            avatar: 'https://via.placeholder.com/150',
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
