import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <>
      [auth_layout_wrapper]
      <Outlet />
      [/auth_layout_wrapper]
    </>
  );
};
