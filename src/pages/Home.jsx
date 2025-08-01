import React, { useEffect } from "react";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import Card from "../components/Card.jsx";

const Home = () => {
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

    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const header = document.querySelector('header');
      const currentScrollY = window.scrollY;
      const dark = document.body.classList.contains('dark');
      if (currentScrollY > 100) {
        header.style.background = dark
          ? 'rgba(0, 0, 0, 0.65)'
          : 'rgba(255, 255, 255, 0.95)';
        header.style.borderBottom = dark
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid rgba(0, 0, 0, 0.1)';
      } else {
        header.style.background = dark
          ? 'rgba(0, 0, 0, 0.5)'
          : 'rgba(255, 255, 255, 0.8)';
        header.style.borderBottom = dark
          ? '1px solid rgba(255, 255, 255, 0.05)'
          : '1px solid rgba(0, 0, 0, 0.05)';
      }
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', onScroll);



    const floatingElements = document.querySelectorAll('.floating-element');
    const onScrollFloat = () => {
      const scrolled = window.pageYOffset;
      floatingElements.forEach(el => {
        const speed = 0.05;
        el.style.transform = `translateY(${scrolled * speed}px)`;
      });
    };
    window.addEventListener('scroll', onScrollFloat);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', onScrollFloat);
    };
  }, []);

  return (
    <div>
      <Header />
      <section className="hero">
        <div className="hero-logo-container">
          <img src="/assets/images/logo.svg" alt="Alelken" className="hero-logo" />
        </div>
        <div className="floating-element floating-triangle" />
        <div className="floating-element floating-triangle" />
        <div className="floating-element floating-triangle" />
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
          <h2 className="section-title">Our Current Focus</h2>
          <p className="section-subtitle">We're building comprehensive wellness solutions that address real human needs. Our flagship platform focuses on four core areas that drive meaningful personal growth:</p>
          <div className="about-grid">
            <Card className="value-card animate-on-scroll" title="Stress Management">
              Evidence-based techniques and personalized guidance to help users effectively manage stress and maintain emotional balance in daily life.
            </Card>
            <Card className="value-card animate-on-scroll" title="Mindfulness Development">
              Structured meditation programs and mindfulness exercises designed to build sustained focus, clarity, and mental resilience.
            </Card>
            <Card className="value-card animate-on-scroll" title="Community Connection">
              Thoughtfully designed social features that foster genuine connections and provide meaningful support networks for personal development.
            </Card>
            <Card className="value-card animate-on-scroll" title="Progress Tracking">
              Comprehensive analytics and insights that help users understand their growth patterns and identify opportunities for continued development.
            </Card>
          </div>
        </div>
      </section>
      <section id="philosophy" className="section philosophy">
        <div className="container">
          <h2 className="section-title">Our Philosophy</h2>
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