import React from 'react';
import { Outlet } from 'react-router-dom';
import MetaTags from './components/MetaTags';

const App = () => {
  return (
    <>
      <MetaTags />
      <Outlet />
    </>
  );
};

export default App;
