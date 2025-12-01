import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './assets/globals.css';
import '@apollo/config/i18n';
import { Routes } from './router/router';
import { ThemeProvider } from '@apollo/ui';

import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSessionPersister, queryClient } from '@apollo/utils';

const persister = createSessionPersister('MEGATON', sessionStorage);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <ThemeProvider defaultTheme="system">
        <Routes />
      </ThemeProvider>
    </PersistQueryClientProvider>
  </StrictMode>
);
