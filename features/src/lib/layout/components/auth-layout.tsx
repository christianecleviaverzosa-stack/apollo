import { AppSidebar } from './sidebar/app-sidebar';
import { SidebarInset, SidebarProvider } from '@apollo/ui';
import { Outlet } from 'react-router-dom';
import { Header } from './header/header';

export const AuthLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
