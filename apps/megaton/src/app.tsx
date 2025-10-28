import { Outlet } from 'react-router-dom';
import { PromptContainer } from '@apollo/features';
import { ThemeProvider } from '@apollo/ui';

export function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <PromptContainer />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
