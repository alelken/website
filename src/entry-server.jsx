import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { renderToPipeableStream } from 'react-dom/server';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';
import { createRoutesFromElements, matchRoutes } from 'react-router-dom';
import App from './App.jsx';
import { routes } from './routes.jsx';

export async function render(url, initialData = {}) {
  const { query } = createStaticHandler(createRoutesFromElements(routes));
  const context = await query(new Request(url));

  if (context instanceof Response) {
    throw context;
  }

  const router = createStaticRouter(routes, context);
  
  return renderToPipeableStream(
    <React.StrictMode>
      <StaticRouterProvider router={router} context={context} />
    </React.StrictMode>,
    {
      bootstrapModules: ['/src/main.jsx'],
      onError(error) {
        console.error(error);
      },
    }
  );
}
