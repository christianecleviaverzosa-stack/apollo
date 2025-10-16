import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div
      data-testid="auth-layout-container"
      className="flex min-h-screen max-h-screen overflow-hidden"
    >
      {/* Sidebar */}
      <aside data-testid="sidebar" className="w-64 bg-blue-700 hidden md:block">
        sidebar
      </aside>
      {/** Header & Scrollable Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header data-testid="header" className="bg-pink-700">
          header
        </header>
        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
