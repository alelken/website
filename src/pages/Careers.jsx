import React from "react";
import useMobileNav from "../hooks/useMobileNav";
const Careers = () => {
  useMobileNav();
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
  <section className="careers-hero">
    <div className="container">
      <div className="careers-hero-content">
        <h1>Join Our Mission</h1>
        <p>Help us build the future of mental wellness technology. We're looking for passionate individuals who share our vision of creating meaningful impact through innovation.</p>
      </div>
    </div>
  </section>
  <section className="benefits-section">
    <div className="container">
      <h2>Why Work With Us</h2>
      <p className="section-subtitle">Join a team that values innovation, work-life balance, and making a real difference in people's lives.</p>
      <div className="benefits-grid">
        <div className="benefit-card">
          <h3>Meaningful Impact</h3>
          <p>Work on technology that directly improves people's mental well-being and quality of life.</p>
        </div>
        <div className="benefit-card">
          <h3>Growth &amp; Learning</h3>
          <p>Continuous opportunities for professional development and skill enhancement.</p>
        </div>
        <div className="benefit-card">
          <h3>Work-Life Balance</h3>
          <p>Flexible schedules, remote work options, and a supportive work environment.</p>
        </div>
      </div>
    </div>
  </section>
  <section className="jobs-section">
    <div className="container">
      <h2>Open Positions</h2>
      <p className="section-subtitle">Explore our current job opportunities and find the perfect role to advance your career while making a difference.</p>
      <div className="jobs-container">
        <div className="jobs-scroll-container" id="jobsScrollContainer">
          {/* Job cards will be dynamically inserted here */}
        </div>
        <div className="scroll-indicator">
          <i className="fas fa-chevron-right" />
        </div>
      </div>
      <div className="expand-jobs-container">
        <button className="expand-jobs-btn" id="expandJobsBtn">
          <span>View All Positions</span>
          <i className="fas fa-chevron-down" />
        </button>
      </div>
    </div>
  </section>
  <footer className="footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Alelken</h3>
          <p>Building human-centered technology solutions for mental wellness and ethical AI.</p>
          <div className="social-links">
            <a href="https://x.com/AlelkenTech" aria-label="Twitter"><svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
              </svg></a>
            <a href="https://www.linkedin.com/company/alelken" aria-label="LinkedIn"><i className="fab fa-linkedin" /></a>
            <a href="https://www.github.com/alelken" aria-label="GitHub"><i className="fab fa-github" /></a>
            <a href="mailto:support@alelken.in" aria-label="Email"><i className="fas fa-envelope" /></a>
          </div>
        </div>
        <div className="footer-section">
          <h3>Company</h3>
          <ul className="footer-links">
            <li><a href="/about">About Us</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/press">Press</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Alelken. All rights reserved.</p>
      </div>
    </div>
  </footer>
</div>
  );
}

export default Careers
