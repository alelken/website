import React from 'react'
import Footer from '../components/Footer.jsx'
import Header from '../components/Header.jsx'

const Product = () => {
  return (
    <div>
      <Header />
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
            <div className="feature-card">
              <h3>Community Connection</h3>
              <p>Share victories and challenges with peers to stay motivated and accountable.</p>
            </div>
          </div>
          <p style={{ marginTop: '2rem' }}>Our platform combines evidence-based practices with advanced AI to guide you every step of the way. Whether you're managing daily stress or seeking deeper mindfulness, the app adapts to your needs.</p>
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
