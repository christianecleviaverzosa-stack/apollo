import { Header } from './header/header';
import { AppSidebar } from './sidebar/app-sidebar';
import { SheetContainer } from '../../sheet/sheet-container';
import { SidebarProvider } from '@apollo/ui';

export const AuthLayout = () => {
  return (
    <SidebarProvider>
      <SheetContainer />
      <div
        data-testid="auth-layout-container"
        className="flex min-h-screen w-full"
      >
        {/* App Sidebar */}
        <AppSidebar />
        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <Header />
          <div className="bg-red-200">test</div>
        </main>
      </div>
    </SidebarProvider>
  );
};
