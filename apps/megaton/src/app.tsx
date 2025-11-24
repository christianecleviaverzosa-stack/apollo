import { Outlet } from 'react-router-dom';
import { PromptContainer } from '@apollo/features/dialog';

export function App() {
  return (
    <>
      <PromptContainer />
      <Outlet />
    </>
  );
}

export default App;
