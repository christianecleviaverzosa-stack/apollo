import { Outlet } from 'react-router-dom';

export const UnAuthLayout = () => {
  return (
    <>
      [un_auth_layout_wrapper]
      <Outlet />
      [/un_auth_layout_wrapper]
    </>
  );
};
