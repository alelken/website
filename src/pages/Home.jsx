import React, { useEffect } from "react";
import Footer from "../components/Footer.jsx";

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
      if (currentScrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
      } else {
        header.style.background = 'rgba(255, 255, 255, 0.8)';
        header.style.borderBottom = '1px solid rgba(0, 0, 0, 0.05)';
      }
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', onScroll);

    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeNav = document.querySelector('.close-nav');
    const body = document.body;
    const toggleMobileNav = () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    };
    hamburger.addEventListener('click', toggleMobileNav);
    closeNav.addEventListener('click', toggleMobileNav);
    document.querySelectorAll('.mobile-nav-links a').forEach(link => link.addEventListener('click', toggleMobileNav));

    const emailBtn = document.querySelector('.email-submit');
    if (emailBtn) {
      emailBtn.addEventListener('click', e => {
        e.preventDefault();
        const emailInput = document.querySelector('.email-input');
        const email = emailInput.value.trim();
        if (email && email.includes('@')) {
          emailBtn.innerHTML = 'Thank You!';
          emailBtn.style.background = '#22c55e';
          emailInput.value = '';
          setTimeout(() => {
            emailBtn.innerHTML = 'Stay Updated';
            emailBtn.style.background = 'var(--primary-black)';
          }, 2000);
        } else {
          emailInput.style.borderColor = '#ef4444';
          emailInput.focus();
          setTimeout(() => {
            emailInput.style.borderColor = 'var(--gray-200)';
          }, 2000);
        }
      });
    }

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
      <header>
        <nav>
          <div className="logo">
            <img src="/assets/images/logo.svg" alt="Alelken" className="nav-logo" />
          </div>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/product">Product</a>
            <a href="/careers">Careers</a>
            <a href="/about">About Us</a>
          </div>
          <div className="hamburger">
            <span />
            <span />
            <span />
          </div>
        </nav>
      </header>
      <div className="mobile-nav">
        <div className="close-nav">
          <span />
          <span />
        </div>
        <div className="mobile-nav-links">
          <a href="/">Home</a>
          <a href="/product">Product</a>
          <a href="/careers">Careers</a>
          <a href="/about">About Us</a>
        </div>
      </div>
      <section className="hero">
        <div className="hero-logo-container">
          <img src="/assets/images/logo.svg" alt="Alelken" className="hero-logo" />
        </div>
        <div className="floating-element floating-triangle" />
        <div className="floating-element floating-triangle" />
        <div className="floating-element floating-triangle" />
        <div className="hero-content container">
          <h1>Transformative Technology.<br />Human-Centered Purpose.</h1>
          <p className="subtitle">We're developing next-generation systems that restore what's broken, empower what's overlooked, and build what truly matters for tomorrow's world.</p>
          <div className="cta-group">
            <a href="/product" className="cta-button">Explore Our Product</a>
            <a href="/about" className="cta-button cta-button-secondary">Learn More</a>
          </div>
        </div>
      </section>
      <section id="about" className="section about">
        <div className="container">
          <div className="about-content animate-on-scroll">
            <h2 className="section-title">Who We Are</h2>
            <p className="section-subtitle">Alelken is founded on the belief that technology should serve humanity's highest potential. We're a team of builders, thinkers, and problem-solvers committed to creating solutions that prioritize human dignity, ethical innovation, and sustainable impact.</p>
          </div>
          <div className="about-grid">
            <div className="value-card animate-on-scroll">
              <h3>Integrity First</h3>
              <p>Transparent processes, honest communication, and accountable leadership in everything we build and deliver.</p>
            </div>
            <div className="value-card animate-on-scroll">
              <h3>Human Dignity</h3>
              <p>Every person matters, every voice deserves to be heard, and technology should elevate human potential.</p>
            </div>
            <div className="value-card animate-on-scroll">
              <h3>Stewardship</h3>
              <p>Responsible use of resources, sustainable innovation, and building solutions for long-term impact.</p>
            </div>
            <div className="value-card animate-on-scroll">
              <h3>Excellence</h3>
              <p>Uncompromising quality in design, development, and delivery of our technological solutions.</p>
            </div>
            <div className="value-card animate-on-scroll">
              <h3>Service</h3>
              <p>Technology that serves people and communities, empowering them rather than replacing them.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="vision" className="section vision">
        <div className="container">
          <h2 className="section-title">What We're Building</h2>
          <p className="section-subtitle">The future needs technology that heals rather than harms, empowers rather than exploits, and connects rather than divides. We're developing platforms and systems that address fundamental challenges in:</p>
          <div className="about-grid">
            <div className="value-card animate-on-scroll">
              <h3>Education &amp; Development</h3>
              <p>Learning systems that unlock human potential and foster meaningful growth</p>
            </div>
            <div className="value-card animate-on-scroll">
              <h3>Leadership &amp; Growth</h3>
              <p>Tools that develop authentic character and principled leadership</p>
            </div>
            <div className="value-card animate-on-scroll">
              <h3>Ethical AI &amp; Governance</h3>
              <p>Artificial intelligence guided by moral principles and human values</p>
            </div>
            <div className="value-card animate-on-scroll">
              <h3>Creative Expression</h3>
              <p>Platforms that enable meaningful storytelling and artistic creation</p>
            </div>
            <div className="value-card animate-on-scroll">
              <h3>Resource Stewardship</h3>
              <p>Transparent systems for accountability and responsible resource management</p>
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
      <section id="contact" className="section contact">
        <div className="container">
          <div className="contact-content animate-on-scroll">
            <h2 className="section-title">Be Part of Something Meaningful</h2>
            <p className="section-subtitle">We're looking for extraordinary people who believe technology can be a force for good. Whether you're a developer, designer, thinker, or builder—if you share our vision, we want to hear from you.</p>
            <div className="email-signup">
              <input type="email" className="email-input" placeholder="Enter your email address" required />
              <button type="submit" className="email-submit">Stay Updated</button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
