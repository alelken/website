import React from 'react';
import { Outlet } from 'react-router-dom';
import MetaTags from './components/MetaTags';
import useForceLightMode from './hooks/useForceLightMode';

const App = () => {
  // Enforce light mode across the application
  useForceLightMode();
  
  return (
    <>
      <MetaTags />
      <Outlet />
    </>
  );
};

export default App;
