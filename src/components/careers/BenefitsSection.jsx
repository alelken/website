import React from 'react';

const BenefitsSection = () => {
  return (
    <section className="benefits-section brand-section">
      <div className="container">
        <h2 className="section-title center-title no-bar">
          <span className="doodle-underline">Why Choose Alelken</span>
        </h2>
        <p className="section-subtitle">
          We offer more than just a career—we provide a platform for professional growth, meaningful work, and the opportunity to shape the future of wellness technology.
        </p>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h3>Impactful Work</h3>
            <p>Contribute to solutions that directly improve lives and address real-world challenges in human wellness and personal development.</p>
          </div>
          <div className="benefit-card">
            <h3>Professional Development</h3>
            <p>Access to cutting-edge training, conferences, certifications, and mentorship programs to accelerate your career growth.</p>
          </div>
          <div className="benefit-card">
            <h3>Flexible Environment</h3>
            <p>Hybrid work models, flexible scheduling, and a results-oriented culture that prioritizes productivity and work-life integration.</p>
          </div>
          <div className="benefit-card">
            <h3>Competitive Package</h3>
            <p>Comprehensive benefits including health coverage, equity participation, performance bonuses, and wellness programs.</p>
          </div>
          <div className="benefit-card">
            <h3>Innovation Freedom</h3>
            <p>Autonomy to explore new ideas, experiment with emerging technologies, and contribute to product strategy and development.</p>
          </div>
          <div className="benefit-card">
            <h3>Diverse Community</h3>
            <p>Work alongside talented professionals from varied backgrounds, fostering an inclusive environment that celebrates different perspectives.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;