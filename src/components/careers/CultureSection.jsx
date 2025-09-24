import React from 'react';
import { FaLightbulb, FaHeart, FaUsers } from 'react-icons/fa';

const CultureSection = () => {
  return (
    <section className="company-culture brand-section">
      <div className="container">
        <h2 className="section-title center-title no-bar">
          <span className="doodle-underline">Our Culture & Values</span>
        </h2>
        <p className="section-subtitle">
          At Alelken, we foster an environment where innovation meets purpose, and every team member contributes to our mission of human-centered technology development.
        </p>
        <div className="culture-grid">
          <div className="culture-item">
            <span className="culture-icon" aria-hidden="true">
              <FaLightbulb size="2rem" />
            </span>
            <h3>Innovation-Driven</h3>
            <p>We encourage creative problem-solving and cutting-edge approaches to complex challenges in wellness technology.</p>
          </div>
          <div className="culture-item gradient-border">
            <span className="culture-icon" aria-hidden="true">
              <FaHeart size="2rem" />
            </span>
            <h3>Purpose-Oriented</h3>
            <p>Every project and decision is guided by our commitment to improving human wellbeing and creating positive societal impact.</p>
          </div>
          <div className="culture-item gradient-border">
            <span className="culture-icon" aria-hidden="true">
              <FaUsers size="2rem" />
            </span>
            <h3>Collaborative Excellence</h3>
            <p>We believe in the power of diverse perspectives and cross-functional collaboration to achieve extraordinary results.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CultureSection;