import { Route } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import Product from './pages/Product';
import Careers from './pages/Careers';
import Press from './pages/Press';
import NotFound from './pages/NotFound';

// Export route elements for SSR
const routeElements = (
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="product" element={<Product />} />
    <Route path="careers" element={<Careers />} />
    {/*<Route path="press" element={<Press />} />*/}
    <Route path="*" element={<NotFound />} />
  </Route>
);

export { routeElements as routes };
