import React from 'react'
import useMobileNav from '../hooks/useMobileNav'
import Footer from '../components/Footer.jsx'

const Product = () => {
  useMobileNav()
  return (
    <div>
      <header>
        <nav>
          <div className="logo">
            <img src="/assets/images/logo.svg" alt="Alelken" className="nav-logo" />
          </div>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/product">Product</a>
            <a href="/careers">Careers</a>
            <a href="/about">About Us</a>
          </div>
          <div className="hamburger">
            <span />
            <span />
            <span />
          </div>
        </nav>
      </header>
      <div className="mobile-nav">
        <div className="close-nav">
          <span />
          <span />
        </div>
        <div className="mobile-nav-links">
          <a href="/">Home</a>
          <a href="/product">Product</a>
          <a href="/careers">Careers</a>
          <a href="/about">About Us</a>
        </div>
      </div>
      <section className="product-hero">
        <div className="container">
          <div className="product-hero-content">
            <h1>Mental Wellness App</h1>
            <p>Your personal companion for mental health and well-being, powered by ethical AI and human-centered design.</p>
          </div>
        </div>
      </section>
      <section className="features">
        <div className="container">
          <h2>Key Features</h2>
          <p className="section-subtitle">Discover powerful tools designed to support your mental wellness journey with personalized care and proven techniques.</p>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Personalized Support</h3>
              <p>AI-powered insights and recommendations tailored to your unique mental health journey.</p>
            </div>
            <div className="feature-card">
              <h3>Mindfulness Tools</h3>
              <p>Guided meditation, breathing exercises, and stress management techniques.</p>
            </div>
            <div className="feature-card">
              <h3>Progress Tracking</h3>
              <p>Monitor your mental well-being with intuitive analytics and progress reports.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="cta-section">
        <div className="container">
          <h2>Start Your Journey to Better Mental Health</h2>
          <p>Join thousands of users who have transformed their lives with our app.</p>
          <a href="#" className="btn">Download Now</a>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Product
