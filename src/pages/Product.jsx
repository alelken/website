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
          <p className="section-subtitle">Alayn brings together expert guidance and intelligent tools to help you thrive.</p>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Real-time Video Therapy</h3>
              <p>Connect with certified therapists for live sessions on everyday concerns like career or parenting advice. Therapists set their own rates, while Alayn adds a transparent platform fee.</p>
            </div>
            <div className="feature-card">
              <h3>Therapist Videos &amp; Workshops</h3>
              <p>Premium users enjoy exclusive video lessons and can join interactive workshops hosted by experts. Workshop tickets include a small commission so therapists are rewarded for their time.</p>
            </div>
            <div className="feature-card">
              <h3>Personality Analysis</h3>
              <p>Our AI combines established psychological frameworks with Gemini models to deliver personalized insights and recommendations tailored to you.</p>
            </div>
            <div className="feature-card">
              <h3>Media Library</h3>
              <p>Learn practical lessons from history with content created by our team in English, Tamil, Hindi, and Kannada. Two pieces are free&mdash;the rest unlock with Premium.</p>
            </div>
            <div className="feature-card">
              <h3>Mindful Exercises</h3>
              <p>Access curated exercises from trusted partners. Start with a free introductory routine and upgrade to explore the full library.</p>
            </div>
          </div>
          <p style={{ marginTop: '2rem' }}>These features combine ethical AI and human expertise to guide you toward lasting well-being. Alayn adapts to your needs whether you are just starting out or looking to deepen existing habits.</p>
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
