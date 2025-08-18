import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './styles/main.css';
import { routes } from './routes';

// Initialize any client-side data
const initialData = window.__INITIAL_DATA__ || {};

// Clear the initial data from the window object
delete window.__INITIAL_DATA__;


// Create the router on client from route elements
const router = createBrowserRouter(createRoutesFromElements(routes));

// Create the root and render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
  </StrictMode>
);
