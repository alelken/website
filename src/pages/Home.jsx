import React, { useEffect } from "react";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";

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
          <h1>Transformative Technology.<br />Human-Centered Purpose.</h1>
          <p className="subtitle">Alelken is developing an AI-driven mental health app focused on daily guidance and personal growth.</p>
          <div className="cta-group">
            <a href="/product" className="cta-button">Learn More</a>
          </div>
        </div>
      </section>
      <section id="vision" className="section vision">
        <div className="container">
          <h2 className="section-title">What We're Building</h2>
          <p className="section-subtitle">Our focus is creating tools that improve mental health for everyone. Here are four ways our technology helps you thrive:</p>
          <div className="about-grid">
            <div className="value-card animate-on-scroll">
              <h3>Stress Management</h3>
              <p>Quick exercises and guidance to calm your mind and body when life feels overwhelming.</p>
            </div>
            <div className="value-card animate-on-scroll">
              <h3>Mindfulness Practices</h3>
              <p>Daily meditations and breathing techniques that build lasting resilience.</p>
            </div>
            <div className="value-card animate-on-scroll">
              <h3>Community Support</h3>
              <p>Connect with others on a similar journey to share encouragement and accountability.</p>
            </div>
            <div className="value-card animate-on-scroll">
              <h3>Progress Insights</h3>
              <p>Personalized analytics to help you see how far you've come and where to grow.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="philosophy" className="section philosophy">
        <div className="container">
          <h2 className="section-title">Our Approach</h2>
          <p className="section-subtitle">We believe the best technology is invisible—it simply makes life better. Our solutions are designed with three fundamental principles that guide every decision we make:</p>
          <div className="philosophy-grid">
            <div className="principle animate-on-scroll">
              <i className="fas fa-hammer principle-icon" aria-hidden="true" />
              <h3>Restoration</h3>
              <p>Fixing what's broken in existing systems, healing dysfunction rather than simply digitalizing it.</p>
            </div>
            <div className="principle animate-on-scroll">
              <i className="fas fa-arrow-up principle-icon" aria-hidden="true" />
              <h3>Elevation</h3>
              <p>Helping people reach their full potential through tools that build character and capability.</p>
            </div>
            <div className="principle animate-on-scroll">
              <i className="fas fa-users principle-icon" aria-hidden="true" />
              <h3>Multiplication</h3>
              <p>Creating platforms that empower others to build, lead, and make lasting positive impact.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
