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
      <section className="about-values">
        <div className="container">
          <div className="about-content">
            <h2 className="section-title">Who We Are</h2>
            <p className="section-subtitle">Alelken is founded on the belief that technology should serve humanity's highest potential. We're a team of builders, thinkers, and problem-solvers committed to creating solutions that prioritize human dignity, ethical innovation, and sustainable impact.</p>
          </div>
          <div className="about-grid">
            <div className="value-card">
              <h3>Integrity First</h3>
              <p>Transparent processes, honest communication, and accountable leadership in everything we build and deliver.</p>
            </div>
            <div className="value-card">
              <h3>Human Dignity</h3>
              <p>Every person matters, every voice deserves to be heard, and technology should elevate human potential.</p>
            </div>
            <div className="value-card">
              <h3>Stewardship</h3>
              <p>Responsible use of resources, sustainable innovation, and building solutions for long-term impact.</p>
            </div>
            <div className="value-card">
              <h3>Excellence</h3>
              <p>Uncompromising quality in design, development, and delivery of our technological solutions.</p>
            </div>
            <div className="value-card">
              <h3>Service</h3>
              <p>Technology that serves people and communities, empowering them rather than replacing them.</p>
            </div>
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
