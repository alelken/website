import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Product from './pages/Product.jsx'
import Careers from './pages/Careers.jsx'
import Blog from './pages/Blog.jsx'


const App = ({ initialData = {} }) => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/product" element={<Product />} />
    <Route path="/careers" element={<Careers initialJobs={initialData.jobs} />} />
    <Route path="/blog" element={<Blog />} />
  </Routes>

)

export default App
