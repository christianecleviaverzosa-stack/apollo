import { Outlet } from 'react-router-dom';
import { Header } from './auth/header';
import { Sidebar } from './auth/sidebar';

export const AuthLayout = () => {
  return (
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
  );
};
