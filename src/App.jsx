import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Product from './pages/Product.jsx'
import Careers from './pages/Careers.jsx'
import Blog from './pages/Blog.jsx'

<<<<<<< HEAD
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/product" element={<Product />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<Blog />} />
    </Routes>
  </Router>
=======
const App = ({ initialData = {} }) => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/product" element={<Product />} />
    <Route path="/careers" element={<Careers initialJobs={initialData.jobs} />} />
    <Route path="/blog" element={<Blog />} />
  </Routes>
>>>>>>> 7e5e58a14ca11adee6b44b08065b55af133cd4ee
)

export default App
