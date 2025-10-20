import { Outlet } from 'react-router-dom';
import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';
import { SheetContainer } from '../../sheet/sheet-container';

export const AuthLayout = () => {
  return (
    <>
      <SheetContainer />
      <div
        data-testid="auth-layout-container"
        className="flex min-h-screen max-h-screen overflow-hidden"
      >
        {/* Sidebar */}
        <Sidebar />
        {/** Header & Scrollable Content */}
        <div className="flex flex-col flex-1">
          {/* Header */}
          <Header />
          {/* Scrollable Content Area */}
          <main className="flex-1 overflow-y-auto p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};
