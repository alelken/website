import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';
import { createRoutesFromElements } from 'react-router-dom';
import { routes } from './routes.jsx';

export async function render(url) {
  // Convert JSX route elements to route objects once
  const routeObjects = createRoutesFromElements(routes);
  const { query } = createStaticHandler(routeObjects);
  // Ensure absolute URL for Node Request
  const fullUrl = url.startsWith('http') ? url : `http://localhost${url}`;
  const context = await query(new Request(fullUrl));

  if (context instanceof Response) {
    throw context;
  }

  const router = createStaticRouter(routeObjects, context);
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouterProvider router={router} context={context} />
    </React.StrictMode>
  );

  return html;
}
