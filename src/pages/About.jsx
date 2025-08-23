import React, { useRef } from 'react';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import ModernCard from '../components/ModernCard.jsx';
import ScrollDots from '../components/ScrollDots';
import { useScrollDots } from '../hooks/useScrollDots';
import "../styles/modern-card.css";

const About = () => {
  const aboutGridRef = useRef(null);
  const teamGridRef = useRef(null);
  
  const aboutItems = [
    { title: "Integrity First", content: "Transparent processes, honest communication, and accountable leadership in everything we build and deliver." },
    { title: "Human Dignity", content: "Every person matters, every voice deserves to be heard, and technology should elevate human potential." },
    { title: "Stewardship", content: "Responsible use of resources, sustainable innovation, and building solutions for long-term impact." },
    { title: "Excellence", content: "Uncompromising quality in design, development, and delivery of our technological solutions." }
  ];
  
  const teamMembers = [
    { name: "HariKrishna", role: "Founder & CEO", bio: "Experienced in AI, Machine Learning, and Android Development.", image: "/team/1.jpeg" },
    { name: "Karthick B", role: "Cofounder & Project Director", bio: "Product strategist focused on creating intuitive and impactful user experiences.", image: "/team/1.jpeg" },
    { name: "Karthick Selvaraj", role: "Media Team Lead", bio: "Experienced in Content Creation.", image: "/team/karthick_selvaraj.jpg" }
  ];
  
  const activeAboutIndex = useScrollDots(aboutGridRef, aboutItems.length);
  const activeTeamIndex = useScrollDots(teamGridRef, teamMembers.length);
  return (
    <div>
      <Header />
      <section className="about-hero hero hero-brand">
        <div className="container hero-shell">
          <div className="about-hero-content hero-text">
            <h1>About Alelken</h1>
            <p>We're a team of passionate individuals dedicated to creating technology that positively impacts lives.</p>
          </div>
        </div>
      </section>
      <section className="about-values brand-section">
        <div className="container">
          <div className="about-content">
            <h2 className="section-title center-title no-bar"><span className="doodle-underline">Who We Are</span></h2>
            <p className="section-subtitle">Alelken is founded on the belief that technology should serve humanity's highest potential. We're a team of builders, thinkers, and problem-solvers committed to creating solutions that prioritize human dignity, ethical innovation, and sustainable impact.</p>
          </div>
          <div className="about-grid" ref={aboutGridRef}>
            {aboutItems.map((item, i) => (
              <ModernCard key={i} className="value-card" title={item.title} variant="elevated" hoverEffect="lift">
                {item.content}
              </ModernCard>
            ))}
          </div>
          <ScrollDots count={aboutItems.length} activeIndex={activeAboutIndex} />
        </div>
      </section>
      <section className="team-section brand-section">
        <div className="container">
          <div className="section-title center-title">
            <h2 className="no-bar"><span className="doodle-underline">Meet Our Team</span></h2>
            <p>The passionate individuals behind Alelken, each bringing unique expertise to advance mental wellness through technology.</p>
          </div>
          <div className="team-grid" ref={teamGridRef}>
            {teamMembers.map((member, i) => (
              <ModernCard
                key={i}
                className="team-card"
                image={{ src: member.image, alt: member.name }}
                title={member.name}
                variant="elevated"
                hoverEffect="lift"
              >
                <div className="role">{member.role}</div>
                {member.bio}
              </ModernCard>
            ))}
          </div>
          <ScrollDots count={teamMembers.length} activeIndex={activeTeamIndex} />
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default About
