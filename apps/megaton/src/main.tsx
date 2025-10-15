import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './assets/globals.css';
import { Routes } from './router/router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <Routes />
  </StrictMode>
);
