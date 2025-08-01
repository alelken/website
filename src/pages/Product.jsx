import React from 'react'
import Footer from '../components/Footer.jsx'
import Header from '../components/Header.jsx'
import Card from '../components/Card.jsx'

const Product = () => {
  return (
    <div>
      <Header />
      <section className="product-hero">
        <div className="container">
          <div className="product-hero-content">
            <h1>Alayn: India's Comprehensive Life Guide</h1>
            <p>A holistic wellness platform that bridges traditional Indian wisdom with modern therapeutic approaches, designed specifically for the diverse needs of Indian communities.</p>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Core Features</h2>
          <p className="section-subtitle">Alayn combines centuries-old Indian practices with evidence-based modern therapies to create personalized pathways for mental wellness and personal growth.</p>
          <div className="features-grid">
            <Card className="feature-card" title="Advanced Personality Analysis">
              Comprehensive assessment tools that evaluate emotional intelligence, self-awareness, motivation, and social skills to create personalized wellness pathways with daily exercises tailored to your unique profile.
            </Card>
            <Card className="feature-card" title="Curated Media Library">
              Inspirational stories, expert podcasts, and articles featuring diverse narratives from Indian philosophers, unsung heroes, and thought leaders. Content available in multiple formats to promote resilience and cultural connection.
            </Card>
            <Card className="feature-card" title="Guided Mindful Exercises">
              Comprehensive practices across eight wellness domains including stress management, social skills, career guidance, relationships, parenting, spiritual exploration, and specialized women's health programs incorporating yoga, pranayama, and meditation.
            </Card>
            <Card className="feature-card" title="Professional Therapy & Workshops">
              Access to certified therapists for individual sessions and group workshops covering specialized areas including addiction recovery, career development, relationship building, and holistic wellness practices.
            </Card>
            <Card className="feature-card" title="Cultural Integration">
              Traditional Indian practices seamlessly woven with modern therapeutic methods, ensuring culturally relevant content that resonates with Indian values and lifestyle patterns.
            </Card>
            <Card className="feature-card" title="Adaptive Personalization">
              Dynamic recommendation system that evolves based on your progress, mood patterns, and preferences, offering structured wellness plans designed for sustained engagement and measurable improvement.
            </Card>
          </div>
        </div>
      </section>

      <section className="accessibility">
        <div className="container">
          <h2>Built for Every Indian</h2>
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

      <section className="mission">
        <div className="container">
          <h2>Addressing India's Mental Health Challenge</h2>
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

      <Footer />
    </div>
  )
}

export default Product