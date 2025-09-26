import React from 'react';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import ModernCard from '../components/ModernCard.jsx';
import '../styles/product.css';
import '../styles/modern-card.css';
import { FaBrain, FaBook, FaPrayingHands, FaUsers, FaUserCog, FaChevronDown, FaLanguage, FaWifi, FaUniversalAccess, FaShieldAlt } from 'react-icons/fa';

const Product = () => {
  
  const featureItems = [
    {
      title: "Advanced Personality Analysis",
      content: "Comprehensive assessment tools that evaluate emotional intelligence, self-awareness, motivation, and social skills to create personalized wellness pathways with daily exercises tailored to your unique profile.",
      icon: <FaBrain />
    },
    {
      title: "Curated Media Library",
      content: "Inspirational stories, expert podcasts, and articles featuring diverse narratives from Indian philosophers, unsung heroes, and thought leaders. Content available in multiple formats to promote resilience and cultural connection.",
      icon: <FaBook />
    },
    {
      title: "Guided Mindful Exercises",
      content: "Comprehensive practices across eight wellness domains including stress management, social skills, career guidance, relationships, parenting, spiritual exploration, and specialized women's health programs incorporating yoga, pranayama, and meditation.",
      icon: <FaPrayingHands />
    },
    {
      title: "Professional Therapy & Workshops",
      content: "Access to certified therapists for individual sessions and group workshops covering specialized areas including addiction recovery, career development, relationship building, and holistic wellness practices.",
      icon: <FaUsers />
    },
    {
      title: "Cultural Integration",
      content: "Traditional Indian practices seamlessly woven with modern therapeutic methods, ensuring culturally relevant content that resonates with Indian values and lifestyle patterns.",
      icon: <FaPrayingHands />
    },
    {
      title: "Adaptive Personalization",
      content: "Dynamic recommendation system that evolves based on your progress, mood patterns, and preferences, offering structured wellness plans designed for sustained engagement and measurable improvement.",
      icon: <FaUserCog />
    }
  ];
  
  // Render features in unique blocks (no card component)
  const FeatureBlock = ({ title, content, icon }) => (
    <div className="feature-block">
      <div className="feature-block-header">
        <span className="feature-icon" aria-hidden="true">
          {icon}
        </span>
        <h3 className="feature-block-title">{title}</h3>
      </div>
      <p className="feature-block-desc">{content}</p>
    </div>
  );

  return (
    <div className="product-page">
      <Header />
      <section className="page-header">
        <div className="container">
          <h1>Meet <span className="brand-highlight">Alayn</span>, Your Companion for Better Living</h1>
          <p>Personalized tools that combine time-tested practices and proven therapy to help you thrive.</p>
        </div>
      </section>

      <section className="features brand-section animated-fade-in">
        <div className="container">
          <h2 className="section-title center-title no-bar"><span className="doodle-underline">Core Features</span></h2>
          <p className="section-subtitle">Alayn combines centuries-old Indian practices with evidence-based modern therapies to create personalized pathways for mental wellness and personal growth.</p>

          {/* Desktop/tablet: unique feature blocks grid */}
          <div className="product-features-desktop">
            <div className="features-grid">
              {featureItems.map((item, idx) => (
                <FeatureBlock key={idx} title={item.title} content={item.content} icon={item.icon} />
              ))}
            </div>
          </div>

          {/* Mobile: simplified accordion list */}
          <div className="product-features-mobile">
            <div className="product-accordion">
              {featureItems.map((item, idx) => (
                <details key={idx} className="product-accordion-item animated-scale-in">
                  <summary className="product-accordion-summary">
                    <span>{item.title}</span>
                    <FaChevronDown className="chevron" aria-hidden />
                  </summary>
                  <div className="product-accordion-content">
                    <p>{item.content}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mission brand-section animated-fade-in">
        <div className="container">
          <h2 className="section-title center-title no-bar"><span className="doodle-underline">Addressing India's Mental Health Challenge</span></h2>
          <p className="section-subtitle">With treatment gaps ranging from 70-95% across urban and rural India, Alayn is positioned to bridge the critical gap in accessible, culturally-sensitive mental health support.</p>
          <div className="mission-content">
            <div className="timeline-container">
              <div className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-dot">
                    <span className="timeline-number">01</span>
                  </div>
                </div>
                <div className="timeline-content">
                  <h3>Cultural Relevance</h3>
                  <p>Integrating traditional Indian philosophical teachings and practices with modern evidence-based therapies for holistic wellness.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-dot">
                    <span className="timeline-number">02</span>
                  </div>
                </div>
                <div className="timeline-content">
                  <h3>Comprehensive Coverage</h3>
                  <p>Addressing stress, anxiety, depression, and social stigma through preventive care and sustained engagement programs.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-dot">
                    <span className="timeline-number">03</span>
                  </div>
                </div>
                <div className="timeline-content">
                  <h3>Measurable Impact</h3>
                  <p>Designed for meaningful outcomes with structured pathways that promote long-term behavioral change and personal growth.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="accessibility brand-section animated-fade-in">
        <div className="container">
          <h2 className="section-title center-title no-bar"><span className="doodle-underline">Built for Every Indian</span></h2>
          <p className="section-subtitle">Designed with India's diverse landscape in mind, ensuring mental wellness support reaches every corner of the country.</p>
          <div className="features-grid">
            <ModernCard 
              variant="elevated"
              hoverEffect="lift"
              className="accessibility-card animated-scale-in"
              title="Multilingual Support"
              icon={<FaLanguage style={{ fontSize: '1.5rem' }} />}
            >
              Available in English, Hindi, Tamil, Kannada, Telugu, and other regional languages to ensure comfortable access for users across India.
            </ModernCard>
            
            <ModernCard 
              variant="elevated"
              hoverEffect="lift"
              className="accessibility-card animated-scale-in"
              title="Optimized for All Connections"
              icon={<FaWifi style={{ fontSize: '1.5rem' }} />}
            >
              Bandwidth-efficient design with offline download capabilities and adaptive streaming, specifically engineered for rural and Tier 2-3 city connectivity.
            </ModernCard>
            
            <ModernCard 
              variant="elevated"
              hoverEffect="lift"
              className="accessibility-card animated-scale-in"
              title="Inclusive Design"
              icon={<FaUniversalAccess style={{ fontSize: '1.5rem' }} />}
            >
              Voice input options, intuitive interfaces, and accessibility features that accommodate diverse user needs and technological comfort levels.
            </ModernCard>
            
            <ModernCard 
              variant="elevated"
              hoverEffect="lift"
              className="accessibility-card animated-scale-in"
              title="Privacy-First Approach"
              icon={<FaShieldAlt style={{ fontSize: '1.5rem' }} />}
            >
              Complete data protection and anonymized insights in full compliance with India's Digital Personal Data Protection Act 2023, ensuring your personal journey remains confidential.
            </ModernCard>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Product