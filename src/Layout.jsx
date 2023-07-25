import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

export default function Layout() {
  return (
    <div className="bg-gradient-to-b from-zinc-100 via-zinc-300 to-sky-300 min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
}
