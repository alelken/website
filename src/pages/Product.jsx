import React from 'react';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';

const Product = () => {
  
  const featureItems = [
    {
      title: "Advanced Personality Analysis",
      content: "Comprehensive assessment tools that evaluate emotional intelligence, self-awareness, motivation, and social skills to create personalized wellness pathways with daily exercises tailored to your unique profile."
    },
    {
      title: "Curated Media Library",
      content: "Inspirational stories, expert podcasts, and articles featuring diverse narratives from Indian philosophers, unsung heroes, and thought leaders. Content available in multiple formats to promote resilience and cultural connection."
    },
    {
      title: "Guided Mindful Exercises",
      content: "Comprehensive practices across eight wellness domains including stress management, social skills, career guidance, relationships, parenting, spiritual exploration, and specialized women's health programs incorporating yoga, pranayama, and meditation."
    },
    {
      title: "Professional Therapy & Workshops",
      content: "Access to certified therapists for individual sessions and group workshops covering specialized areas including addiction recovery, career development, relationship building, and holistic wellness practices."
    },
    {
      title: "Cultural Integration",
      content: "Traditional Indian practices seamlessly woven with modern therapeutic methods, ensuring culturally relevant content that resonates with Indian values and lifestyle patterns."
    },
    {
      title: "Adaptive Personalization",
      content: "Dynamic recommendation system that evolves based on your progress, mood patterns, and preferences, offering structured wellness plans designed for sustained engagement and measurable improvement."
    }
  ];
  
  // Render features in unique blocks (no card component)
  const FeatureBlock = ({ title, content }) => (
    <div className="feature-block">
      <h3 className="feature-block-title">{title}</h3>
      <p className="feature-block-desc">{content}</p>
    </div>
  );

  return (
    <div className="product-page">
      <Header />
      <section className="product-hero page-section hero hero-brand">
        <div className="container hero-shell">
          <div className="product-hero-content hero-text">
            <h1>Meet <span className="brand-highlight">Alayn</span>, Your Companion for Better Living</h1>
            <p>Personalized tools that combine time-tested practices and proven therapy to help you thrive.</p>
          </div>
          <div className="hero-media-card glass soft-border" aria-hidden="true">
            <img src="/assets/images/life_guide.svg" alt="Alayn Life Guide" loading="eager" decoding="async" fetchPriority="high" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      <section className="features brand-section">
        <div className="container">
          <h2 className="section-title center-title no-bar"><span className="doodle-underline">Core Features</span></h2>
          <p className="section-subtitle">Alayn combines centuries-old Indian practices with evidence-based modern therapies to create personalized pathways for mental wellness and personal growth.</p>

          {/* Desktop/tablet: unique feature blocks grid */}
          <div className="product-features-desktop">
            <div className="features-grid">
              {featureItems.map((item, idx) => (
                <FeatureBlock key={idx} title={item.title} content={item.content} />
              ))}
            </div>
          </div>

          {/* Mobile: simplified accordion list */}
          <div className="product-features-mobile">
            <div className="product-accordion">
              {featureItems.map((item, idx) => (
                <details key={idx} className="product-accordion-item">
                  <summary className="product-accordion-summary">
                    <span>{item.title}</span>
                    <span className="chevron" aria-hidden>›</span>
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

      <section className="mission brand-section">
        <div className="container">
            <h2 className="section-title center-title no-bar"><span className="doodle-underline">Addressing India's Mental Health Challenge</span></h2>
          <p className="section-subtitle">With treatment gaps ranging from 70-95% across urban and rural India, Alayn is positioned to bridge the critical gap in accessible, culturally-sensitive mental health support.</p>
          <div className="mission-content">
            <div className="mission-stats">
              <div className="stat">
                <h3>Cultural Relevance</h3>
                <p>Integrating traditional Indian philosophical teachings and practices with modern evidence-based therapies for holistic wellness.</p>
              </div>
              <div className="stat">
                <h3>Comprehensive Coverage</h3>
                <p>Addressing stress, anxiety, depression, and social stigma through preventive care and sustained engagement programs.</p>
              </div>
              <div className="stat">
                <h3>Measurable Impact</h3>
                <p>Designed for meaningful outcomes with structured pathways that promote long-term behavioral change and personal growth.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="accessibility brand-section">
        <div className="container">
            <h2 className="section-title center-title no-bar"><span className="doodle-underline">Built for Every Indian</span></h2>
          <p className="section-subtitle">Designed with India's diverse landscape in mind, ensuring mental wellness support reaches every corner of the country.</p>
          <div className="accessibility-grid">
            <div className="accessibility-feature">
              <h3>Multilingual Support</h3>
              <p>Available in English, Hindi, Tamil, Kannada, Telugu, and other regional languages to ensure comfortable access for users across India.</p>
            </div>
            <div className="accessibility-feature">
              <h3>Optimized for All Connections</h3>
              <p>Bandwidth-efficient design with offline download capabilities and adaptive streaming, specifically engineered for rural and Tier 2-3 city connectivity.</p>
            </div>
            <div className="accessibility-feature">
              <h3>Inclusive Design</h3>
              <p>Voice input options, intuitive interfaces, and accessibility features that accommodate diverse user needs and technological comfort levels.</p>
            </div>
            <div className="accessibility-feature">
              <h3>Privacy-First Approach</h3>
              <p>Complete data protection and anonymized insights in full compliance with India's Digital Personal Data Protection Act 2023, ensuring your personal journey remains confidential.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Product