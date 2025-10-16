import { Outlet } from 'react-router-dom';

export const UnAuthLayout = () => {
  return (
    <main data-testid="unauth-layout-container" className="flex min-h-screen flex-col">
      <Outlet />
    </main>
  );
};
