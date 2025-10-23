import { Outlet } from 'react-router-dom';
import { PromptContainer } from '@apollo/features';

export function App() {
  return (
    <>
      <PromptContainer />
      <Outlet />
    </>
  );
}

export default App;
