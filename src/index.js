import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import { LoggedInProvider } from './contexts/LoggedInContext.js';
import App from './components/App.jsx';

import '../styles/tailwind.css';

const container = document.getElementById('root');
const root = createRoot(container);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <LoggedInProvider>
      <App />
    </LoggedInProvider>
  </QueryClientProvider>
);
