import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import Product from './pages/Product';
import Careers from './pages/Careers';
import NotFound from './pages/NotFound';
// import Blog from './pages/Blog';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="product" element={<Product />} />
      <Route path="careers" element={<Careers />} />
      {/* <Route path="blog" element={<Blog />} />
      <Route path="blog/:slug" element={<Blog />} /> */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export { router, router as routes };
