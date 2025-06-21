import React from 'react'
import useMobileNav from '../hooks/useMobileNav'

const About = () => {
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
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1>About Alelken</h1>
            <p>We're a team of passionate individuals dedicated to creating technology that positively impacts lives.</p>
          </div>
        </div>
      </section>
      <section className="team-section">
        <div className="container">
          <div className="section-title">
            <h2>Meet Our Team</h2>
            <p>The passionate individuals behind Alelken, each bringing unique expertise to advance mental wellness through technology.</p>
          </div>
          <div className="team-grid">
            <div className="team-card">
              <img src="/team/1.jpeg" alt="HariKrishna" />
              <h3>HariKrishna</h3>
              <div className="role">Founder &amp; CEO</div>
              <p>Experienced in AI, Machine Learning, and Android Development.</p>
            </div>
            <div className="team-card">
              <img src="/team/1.jpeg" alt="Balraj" />
              <h3>Karthick B</h3>
              <div className="role">Cofounder &amp; Project Director</div>
              <p>Product strategist focused on creating intuitive and impactful user experiences.</p>
            </div>
            <div className="team-card">
              <img src="/team/karthick_selvaraj.jpg" alt="Selvaraj" />
              <h3>Karthick Selvaraj</h3>
              <div className="role">Media Team Lead</div>
              <p>Experienced in Content Creation.</p>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Alelken</h3>
              <p>Building human-centered technology solutions for mental wellness and ethical AI.</p>
            </div>
            <div className="footer-section">
              <h3>Company</h3>
              <ul className="footer-links">
                <li><a href="/about">About Us</a></li>
                <li><a href="/careers">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Alelken. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default About
