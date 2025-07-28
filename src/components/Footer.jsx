import React from 'react'

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Alelken</h3>
          <p>Building human-centered technology solutions for mental wellness and ethical AI.</p>
          <div className="social-links">
            <a href="https://x.com/AlelkenTech" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/alelken" aria-label="LinkedIn">
              <i className="fab fa-linkedin" />
            </a>
            <a href="https://www.instagram.com/alelkentech" aria-label="Instagram">
              <i className="fab fa-instagram" />
            </a>
            <a href="mailto:support@alelken.in" aria-label="Email">
              <i className="fas fa-envelope" />
            </a>
          </div>
        </div>
        <div className="footer-section">
          <h3>Company</h3>
          <ul className="footer-links">
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
)

export default Footer
