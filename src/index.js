import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';

import { LoggedInProvider } from './contexts/LoggedInContext.js';
import App from './components/App.jsx';

import '../styles/tailwind.css';
import Layout from './Layout.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import RecipesPage from './components/RecipesPage.jsx';

const container = document.getElementById('root');
const root = createRoot(container);

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />,
        loader: async () => await axios('/shelflife'),
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/recipespage',
        element: <RecipesPage />,
      },
    ],
  },
]);

root.render(
  <QueryClientProvider client={queryClient}>
    <LoggedInProvider>
      <RouterProvider router={router} />
    </LoggedInProvider>
  </QueryClientProvider>
);
