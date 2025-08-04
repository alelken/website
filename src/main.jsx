import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './styles/main.css';
import { router } from './routes';

// Initialize any client-side data
const initialData = window.__INITIAL_DATA__ || {};

// Clear the initial data from the window object
delete window.__INITIAL_DATA__;


// Create the root and render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
  </StrictMode>
);
