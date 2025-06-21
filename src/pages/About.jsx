import React from 'react'
import Footer from '../components/Footer.jsx'
import Header from '../components/Header.jsx'

const About = () => {
  return (
    <div>
      <Header />
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
      <Footer />
    </div>
  )
}

export default About
