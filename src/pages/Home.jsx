import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHandHoldingHeart,
    faBrain,
    faUsers,
    faChartLine,
    faHammer,
    faArrowUp
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
      icon={<FontAwesomeIcon icon={icon} />}
    >
      <p className="card-description">{content}</p>
    </Card>
  );

  const philosophyItems = [
    {
      title: "Restoration",
      content: "Addressing fundamental gaps in existing systems by creating solutions that heal rather than simply digitize broken processes.",
      icon: faHammer
    },
    {
      title: "Elevation",
      content: "Empowering individuals to reach their highest potential through tools that strengthen character, capability, and personal growth.",
      icon: faArrowUp
    },
    {
      title: "Multiplication",
      content: "Building platforms that enable others to create, lead, and generate positive impact that extends far beyond our direct reach.",
      icon: faUsers
    }
  ];

  const PhilosophyCard = ({ title, content, icon }) => (
    <Card
      className="philosophy-card"
      title={title}
      icon={<FontAwesomeIcon icon={icon} />}
    >
      <p className="card-description">{content}</p>
    </Card>
  );

  useEffect(() => {
    const anchors = document.querySelectorAll("a[href^='#']");
    const handleClick = e => {
      e.preventDefault();
      document.querySelector(e.currentTarget.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
    };
    anchors.forEach(anchor => anchor.addEventListener('click', handleClick));
    return () => anchors.forEach(anchor => anchor.removeEventListener('click', handleClick));
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
          <CardCarousel
            items={philosophyItems}
            cardComponent={PhilosophyCard}
            className="philosophy-carousel"
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;