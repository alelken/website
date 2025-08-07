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
import Card from "../components/Card.jsx";
import CardCarousel from "../components/CardCarousel.jsx";
import "../styles/home.css";

const Home = () => {
  const featureItems = [
    { 
      title: "Stress Management", 
      content: "Evidence-based techniques and personalized guidance to help users effectively manage stress and maintain emotional balance in daily life.",
      icon: faHandHoldingHeart
    },
    { 
      title: "Mindfulness Development", 
      content: "Structured meditation programs and mindfulness exercises designed to build sustained focus, clarity, and mental resilience.",
      icon: faBrain
    },
    { 
      title: "Community Connection", 
      content: "Thoughtfully designed social features that foster genuine connections and provide meaningful support networks for personal development.",
      icon: faUsers
    },
    { 
      title: "Progress Tracking", 
      content: "Comprehensive analytics and insights that help users understand their growth patterns and identify opportunities for continued development.",
      icon: faChartLine
    }
  ];

  // Feature card component
  const FeatureCard = ({ title, content, icon }) => (
    <Card 
      className={`feature-card ${title.toLowerCase().replace(/\s+/g, '-')}`}
      title={title}
    >
      <div className="feature-icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <p className="card-description">{content}</p>
    </Card>
  );

  useEffect(() => {
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
      anchor.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('animate');
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <Header />
      <section className="hero">
        <div className="hero-content container">
          <h1>Innovative Technology.<br />Human-Centered Solutions.</h1>
          <p className="subtitle">Alelken develops cutting-edge digital platforms that enhance human wellbeing and personal development through thoughtful technology integration.</p>
          <div className="cta-group">
            <a href="/product" className="cta-button">Discover Our Solutions</a>
          </div>
        </div>
      </section>
      <section id="vision" className="section vision">
        <div className="container">
          <h2 className="section-title center-title">Our Current Focus</h2>
          <p className="section-subtitle">We're building comprehensive wellness solutions that address real human needs. Our flagship platform focuses on four core areas that drive meaningful personal growth:</p>
          
          <CardCarousel 
            items={featureItems}
            cardComponent={FeatureCard}
            className="features-carousel"
          />
          
        </div>
      </section>
      <section id="philosophy" className="section philosophy">
        <div className="container">
          <h2 className="section-title center-title">Our Philosophy</h2>
          <p className="section-subtitle">We believe technology should enhance human potential without overwhelming it. Our approach is grounded in three core principles that guide everything we build:</p>
          <div className="philosophy-grid">
            <div className="principle animate-on-scroll">
              <i className="fas fa-hammer principle-icon" aria-hidden="true" />
              <h3>Restoration</h3>
              <p>Addressing fundamental gaps in existing systems by creating solutions that heal rather than simply digitize broken processes.</p>
            </div>
            <div className="principle animate-on-scroll">
              <i className="fas fa-arrow-up principle-icon" aria-hidden="true" />
              <h3>Elevation</h3>
              <p>Empowering individuals to reach their highest potential through tools that strengthen character, capability, and personal growth.</p>
            </div>
            <div className="principle animate-on-scroll">
              <i className="fas fa-users principle-icon" aria-hidden="true" />
              <h3>Multiplication</h3>
              <p>Building platforms that enable others to create, lead, and generate positive impact that extends far beyond our direct reach.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;