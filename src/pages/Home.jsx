import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandHoldingHeart,
  faBrain,
  faUsers,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import ModernCard from "../components/ModernCard.jsx";
import "../styles/modern-card.css";

const Home = () => {
  // Avoid accessing window during SSR; initialize safely and compute on client in useEffect
  
  const featureItems = [
    { 
      title: "Stress Management", 
      content: "Practical, evidence‑based tools to reduce stress, build calm, and stay emotionally balanced each day.",
      icon: faHandHoldingHeart
    },
    { 
      title: "Mindfulness Development", 
      content: "Guided meditation and mindfulness exercises that grow focus, clarity, and lasting mental resilience.",
      icon: faBrain
    },
    { 
      title: "Community Connection", 
      content: "Supportive spaces and features that spark genuine connection and meaningful, growth‑oriented community.",
      icon: faUsers
    },
    { 
      title: "Progress Tracking", 
      content: "Clear insights and trends that show progress, highlight habits, and reveal opportunities to grow.",
      icon: faChartLine
    }
  ];

  // Feature card component
  const FeatureCard = ({ title, content, icon }) => (
    <ModernCard 
      variant="elevated"
      hoverEffect="lift"
      className={`feature-card hover-float glass soft-border animated-scale-in ${title.toLowerCase().replace(/\s+/g, '-')}`}
      title={title}
      icon={<FontAwesomeIcon icon={icon} size="lg" />}
    >
      {content}
    </ModernCard>
  );

  // Handle animations and smooth scrolling
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
      anchor.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Add animation on scroll
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('animate');
      });
    }, observerOptions) : null;

    if (observer && typeof document !== 'undefined') {
      document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);


  return (
    <div>
      <Header />
      <section className="hero hero-brand animated-fade-in">
        <div className="hero-shell container">
          <div className="hero-text animated-slide-up">
            <h1>Innovative Technology.<br />Human-Centered Solutions.</h1>
            <p className="subtitle">Alelken develops cutting-edge digital platforms that enhance human wellbeing and personal development through thoughtful technology integration.</p>
            <div className="cta-group">
              <a href="/product" className="cta-button btn-primary hover-float animated-pop">Discover Our Solutions</a>
            </div>
          </div>
          <div className="hero-media-card glass soft-border animated-scale-in">
            {/* Static hero illustration (no floating) */}
            <img src="/assets/images/connected_world.svg" alt="Connected world" loading="eager" decoding="async" fetchPriority="high" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        </div>
      </section>

      <section id="vision" className="section vision brand-section animated-fade-in">
        <div className="container">
          <h2 className="section-title center-title no-bar"><span className="doodle-underline">Our Current Focus</span></h2>
          <p className="section-subtitle">We're building comprehensive wellness solutions that address real human needs. Our flagship platform focuses on four core areas that drive meaningful personal growth:</p>

          <ul className="focus-list">
            {featureItems.map((item, i) => (
              <li key={i} className="focus-item split animated-slide-up">
                <div className="focus-left">
                  <span className="icon-chip" aria-hidden="true">
                    <FontAwesomeIcon icon={item.icon} />
                  </span>
                  <h3 className="focus-title">{item.title}</h3>
                </div>
                <p className="focus-text">{item.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section id="philosophy" className="section philosophy brand-section animated-fade-in">
        <div className="container">
          <h2 className="section-title center-title no-bar"><span className="doodle-underline">Our Vision</span></h2>
          <p className="section-subtitle">We believe technology should enhance human potential without overwhelming it. Our approach is grounded in three core principles that guide everything we build:</p>
          <div className="philosophy-list">
            <div className="principle-row animated-scale-in">
              <span className="icon-chip" aria-hidden="true"><i className="fas fa-hammer" /></span>
              <div>
                <h3 className="principle-title">Restoration</h3>
                <p className="principle-text">Addressing fundamental gaps in existing systems by creating solutions that heal rather than simply digitize broken processes.</p>
              </div>
            </div>
            <div className="principle-row animated-scale-in">
              <span className="icon-chip" aria-hidden="true"><i className="fas fa-arrow-up" /></span>
              <div>
                <h3 className="principle-title">Elevation</h3>
                <p className="principle-text">Empowering individuals to reach their highest potential through tools that strengthen character, capability, and personal growth.</p>
              </div>
            </div>
            <div className="principle-row animated-scale-in">
              <span className="icon-chip" aria-hidden="true"><i className="fas fa-users" /></span>
              <div>
                <h3 className="principle-title">Multiplication</h3>
                <p className="principle-text">Building platforms that enable others to create, lead, and generate positive impact that extends far beyond our direct reach.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
