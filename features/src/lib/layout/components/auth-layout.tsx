import { Header } from './header/header';
import { AppSidebar } from './sidebar/app-sidebar';
import { SheetContainer } from '../../sheet/sheet-container';
import { SidebarProvider } from '@apollo/ui';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <SidebarProvider>
      <SheetContainer />
      <div
        data-testid="auth-layout-container"
        className="flex min-h-screen w-full"
      >
        {/* Sidebar */}
        <AppSidebar />
        {/* Main area */}
        <main className="flex flex-col flex-1 h-screen">
          {/* Fixed Header */}
          <Header />
          {/* Scrollable content below header */}
          <div className="flex-1 p-4 overflow-y-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};
