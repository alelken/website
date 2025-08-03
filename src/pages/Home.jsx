import React, { useRef, useEffect, useState } from "react";
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

const Home = () => {
  const featureCardsRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showDots, setShowDots] = useState(window.innerWidth < 768);
  const [totalCards, setTotalCards] = useState(4);
  const [cardsPerView, setCardsPerView] = useState(window.innerWidth < 768 ? 1 : 4);
  
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

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setShowDots(isMobile);
      setCardsPerView(isMobile ? 1 : 4);
      
      // Reset active index on desktop
      if (!isMobile) {
        setActiveIndex(0);
      }
    };

    // Smooth scroll for anchor links
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
      anchor.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Add animation on scroll
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('animate');
      });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // Initialize and add event listener for window resize
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle scroll dot click
  const handleDotClick = (index) => {
    if (featureCardsRef.current) {
      const container = featureCardsRef.current;
      const cards = Array.from(container.children).filter(
        child => child.classList && child.classList.contains('feature-card')
      );
      
      if (cards[index]) {
        const containerWidth = container.offsetWidth;
        const card = cards[index];
        const cardRect = card.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const scrollLeft = container.scrollLeft;
        const cardLeft = cardRect.left - containerRect.left + scrollLeft;
        const cardWidth = cardRect.width;
        
        // Calculate scroll position to center the card
        const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);
        
        container.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
        setActiveIndex(index);
      }
    }
  };

  // Handle scroll events to update active dot with debounce
  const handleScroll = () => {
    if (featureCardsRef.current && showDots) {
      const container = featureCardsRef.current;
      const cards = Array.from(container.children).filter(
        child => child.classList && child.classList.contains('feature-card')
      );
      
      // Find the card closest to the center
      let closestCard = null;
      let minDistance = Infinity;
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + (containerRect.width / 2);
      
      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + (cardRect.width / 2);
        const distance = Math.abs(cardCenter - containerCenter);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestCard = index;
        }
      });
      
      if (closestCard !== null && closestCard !== activeIndex) {
        setActiveIndex(closestCard);
      }
    }
  };

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