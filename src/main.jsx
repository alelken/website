import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './styles/global.css';
import { router } from './routes';

// Create the root and render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
  </StrictMode>
);
