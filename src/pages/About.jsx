import React from 'react'
import Footer from '../components/Footer.jsx'
import Header from '../components/Header.jsx'
import Card from '../components/Card.jsx'

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
            <Card className="value-card" title="Integrity First">
              Transparent processes, honest communication, and accountable leadership in everything we build and deliver.
            </Card>
            <Card className="value-card" title="Human Dignity">
              Every person matters, every voice deserves to be heard, and technology should elevate human potential.
            </Card>
            <Card className="value-card" title="Stewardship">
              Responsible use of resources, sustainable innovation, and building solutions for long-term impact.
            </Card>
            <Card className="value-card" title="Excellence">
              Uncompromising quality in design, development, and delivery of our technological solutions.
            </Card>
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
            <Card className="team-card" image={{ src: '/team/1.jpeg', alt: 'HariKrishna' }} title="HariKrishna">
              <div className="role">Founder &amp; CEO</div>
              Experienced in AI, Machine Learning, and Android Development.
            </Card>
            <Card className="team-card" image={{ src: '/team/1.jpeg', alt: 'Balraj' }} title="Karthick B">
              <div className="role">Cofounder &amp; Project Director</div>
              Product strategist focused on creating intuitive and impactful user experiences.
            </Card>
            <Card className="team-card" image={{ src: '/team/karthick_selvaraj.jpg', alt: 'Selvaraj' }} title="Karthick Selvaraj">
              <div className="role">Media Team Lead</div>
              Experienced in Content Creation.
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default About
