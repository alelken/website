import React, { useEffect, useState, useRef, useCallback } from "react";
import Footer from "../components/Footer.jsx";
import JobModal from "../components/JobModal.jsx";
import JobDetailsModal from "../components/JobDetailsModal.jsx";
import Header from "../components/Header.jsx";
import ModernCard from "../components/ModernCard.jsx";
import "../styles/modern-card.css";

const Careers = ({ initialJobs = [] }) => {
  const [jobs, setJobs] = useState(initialJobs);
  const [expanded, setExpanded] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyingJob, setApplyingJob] = useState(null);
  const [activeDot, setActiveDot] = useState(0);
  const [dotCount, setDotCount] = useState(0);
  const jobsGridRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    if (initialJobs.length) return;
    fetch('/data/jobs.json')
      .then(res => res.json())
      .then(data => setJobs(data.jobs))
      .catch(err => console.error('Failed to load jobs', err));
  }, [initialJobs]);

  // Calculate number of dots based on visible cards
  const updateDots = useCallback(() => {
    if (typeof window === 'undefined' || !jobsGridRef.current) return 0;
    
    const container = jobsGridRef.current;
    const containerWidth = container.offsetWidth;
    const cardWidth = 300; // Approximate card width including gap
    const visibleCards = Math.floor(containerWidth / cardWidth);
    const totalCards = jobs.length;
    
    const dots = Math.max(1, Math.ceil(totalCards / Math.max(1, visibleCards)));
    setDotCount(dots);
    return dots;
  }, [jobs.length]);

  // Handle scroll events to update active dot
  const handleScroll = useCallback(() => {
    if (!jobsGridRef.current) return;
    
    const container = jobsGridRef.current;
    const scrollPosition = container.scrollLeft;
    const scrollWidth = container.scrollWidth - container.clientWidth;
    
    if (scrollWidth > 0) {
      const newActiveDot = Math.round((scrollPosition / scrollWidth) * (dotCount - 1));
      setActiveDot(newActiveDot);
    }
  }, [dotCount]);

  // Handle dot click to scroll to corresponding card
  const scrollToDot = useCallback((dotIndex) => {
    if (!jobsGridRef.current) return;
    
    const container = jobsGridRef.current;
    const scrollWidth = container.scrollWidth - container.clientWidth;
    const scrollPosition = (scrollWidth / (dotCount - 1 || 1)) * dotIndex;
    
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }, [dotCount]);

  // Handle auto-scroll to center the active card
  const handleScrollEnd = useCallback(() => {
    if (!jobsGridRef.current) return;
    
    const container = jobsGridRef.current;
    const cards = container.querySelectorAll('.job-card');
    if (!cards.length) return;
    
    const containerCenter = container.scrollLeft + (container.offsetWidth / 2);
    let closestCard = null;
    let minDistance = Infinity;
    
    cards.forEach(card => {
      const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
      const distance = Math.abs(containerCenter - cardCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestCard = card;
      }
    });
    
    if (closestCard) {
      const cardCenter = closestCard.offsetLeft + (closestCard.offsetWidth / 2);
      const containerCenter = container.offsetWidth / 2;
      const scrollPosition = cardCenter - containerCenter;
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  // Setup event listeners and initial state
  useEffect(() => {
    const container = jobsGridRef.current;
    if (!container) return;
    
    const handleResize = () => {
      updateDots();
      handleScroll();
    };
    
    let isScrolling = false;
    
    const handleScrollEvent = () => {
      if (!isScrolling) {
        isScrolling = true;
        handleScroll();
      }
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        isScrolling = false;
        handleScrollEnd();
      }, 100);
    };
    
    // Initial setup
    updateDots();
    
    // Add event listeners
    container.addEventListener('scroll', handleScrollEvent);
    window.addEventListener('resize', handleResize);
    
    return () => {
      container.removeEventListener('scroll', handleScrollEvent);
      window.removeEventListener('resize', handleResize);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [updateDots, handleScroll, handleScrollEnd]);

  return (
    <div className="careers-page">
      <Header />
      <main>
        <section className="careers-hero hero hero-brand">
          <div className="container hero-shell">
            <div className="careers-hero-content hero-text">
              <h1>Shape the Future of Human Wellness</h1>
              <p>Join Alelken in building transformative technology solutions that enhance human potential and create meaningful impact across diverse communities. We're seeking exceptional talent to help us redefine how technology serves humanity.</p>
            </div>
          </div>
        </section>

        <section className="company-culture brand-section">
        <div className="container">
          <h2 className="section-title center-title">Our Culture & Values</h2>
          <p className="section-subtitle">At Alelken, we foster an environment where innovation meets purpose, and every team member contributes to our mission of human-centered technology development.</p>
          <div className="culture-grid">
            <div className="culture-item glass soft-border hover-float">
              <i className="fas fa-lightbulb culture-icon" aria-hidden="true" />
              <h3>Innovation-Driven</h3>
              <p>We encourage creative problem-solving and cutting-edge approaches to complex challenges in wellness technology.</p>
            </div>
            <div className="culture-item glass gradient-border hover-float">
              <i className="fas fa-heart culture-icon" aria-hidden="true" />
              <h3>Purpose-Oriented</h3>
              <p>Every project and decision is guided by our commitment to improving human wellbeing and creating positive societal impact.</p>
            </div>
            <div className="culture-item glass gradient-border hover-float">
              <i className="fas fa-users culture-icon" aria-hidden="true" />
              <h3>Collaborative Excellence</h3>
              <p>We believe in the power of diverse perspectives and cross-functional collaboration to achieve extraordinary results.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="benefits-section brand-section">
        <div className="container">
          <h2 className="section-title center-title">Why Choose Alelken</h2>
          <p className="section-subtitle">We offer more than just a career—we provide a platform for professional growth, meaningful work, and the opportunity to shape the future of wellness technology.</p>
          <div className="benefits-grid">
            <ModernCard className="benefit-card glass soft-border hover-float" title="Impactful Work" variant="elevated" hoverEffect="lift">
              Contribute to solutions that directly improve lives and address real-world challenges in human wellness and personal development.
            </ModernCard>
            <ModernCard className="benefit-card glass soft-border hover-float" title="Professional Development" variant="elevated" hoverEffect="lift">
              Access to cutting-edge training, conferences, certifications, and mentorship programs to accelerate your career growth.
            </ModernCard>
            <ModernCard className="benefit-card glass soft-border hover-float" title="Flexible Environment" variant="elevated" hoverEffect="lift">
              Hybrid work models, flexible scheduling, and a results-oriented culture that prioritizes productivity and work-life integration.
            </ModernCard>
            <ModernCard className="benefit-card glass soft-border hover-float" title="Competitive Package" variant="elevated" hoverEffect="lift">
              Comprehensive benefits including health coverage, equity participation, performance bonuses, and wellness programs.
            </ModernCard>
            <ModernCard className="benefit-card glass soft-border hover-float" title="Innovation Freedom" variant="elevated" hoverEffect="lift">
              Autonomy to explore new ideas, experiment with emerging technologies, and contribute to product strategy and development.
            </ModernCard>
            <ModernCard className="benefit-card glass soft-border hover-float" title="Diverse Community" variant="elevated" hoverEffect="lift">
              Work alongside talented professionals from varied backgrounds, fostering an inclusive environment that celebrates different perspectives.
            </ModernCard>
          </div>
        </div>
      </section>

      <section className="jobs-section brand-section">
        <div className="container">
          <h2 className="section-title center-title">Current Opportunities</h2>
          <p className="section-subtitle">Explore our open positions across engineering, design, business development, and operations. Find the role that aligns with your expertise and career aspirations.</p>
          <div className="jobs-container">
            <div className="jobs-grid" ref={jobsGridRef}>
              {jobs.map(job => (
                <div key={job.id} className="job-card glass soft-border hover-float">
                  <h3>{job.title}</h3>
                  <div className="job-meta">
                    <span><i className="fas fa-map-marker-alt" />{job.location}</span>
                    <span><i className="fas fa-clock" />{job.type}</span>
                  </div>
                  <p>{job.description}</p>
                  <button className="btn cta-button hover-float" onClick={() => setSelectedJob(job)}>
                    View Details
                  </button>
                </div>
              ))}
            </div>
            
            {/* Scroll dots navigation - only visible on mobile */}
            {dotCount > 1 && (
              <div className="scroll-dots" style={{ display: 'none' }}>
                {Array.from({ length: dotCount }).map((_, index) => (
                  <button
                    key={index}
                    className={`scroll-dot ${index === activeDot ? 'active' : ''}`}
                    onClick={() => scrollToDot(index)}
                    aria-label={`Go to job card ${index + 1} of ${dotCount}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="join-mission brand-section">
        <div className="container">
          <h2 className="section-title center-title">Ready to Make an Impact?</h2>
          <p className="section-subtitle">If you're passionate about using technology to solve meaningful problems and want to be part of a team that's building the future of human wellness, we'd love to hear from you.</p>
          <div className="mission-cta">
            <p>Don't see the perfect role? We're always interested in connecting with exceptional talent who share our vision.</p>
            <a href="mailto:support@alelken.com" className="cta-button hover-float">Get in Touch</a>
          </div>
        </div>
      </section>
      </main>

      <Footer />
      <JobDetailsModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onApply={job => {
          setSelectedJob(null);
          setApplyingJob(job);
        }}
      />
      <JobModal job={applyingJob} onClose={() => setApplyingJob(null)} />
    </div>
  );
}

export default Careers