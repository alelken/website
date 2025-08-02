import React, { useEffect, useState } from "react";
import Footer from "../components/Footer.jsx";
import JobModal from "../components/JobModal.jsx";
import JobDetailsModal from "../components/JobDetailsModal.jsx";
import Header from "../components/Header.jsx";
import Card from "../components/Card.jsx";

const Careers = ({ initialJobs = [] }) => {
  const [jobs, setJobs] = useState(initialJobs);
  const [expanded, setExpanded] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyingJob, setApplyingJob] = useState(null);

  useEffect(() => {
    if (initialJobs.length) return;
    fetch('/data/jobs.json')
      .then(res => res.json())
      .then(data => setJobs(data.jobs))
      .catch(err => console.error('Failed to load jobs', err));
  }, [initialJobs]);

  // Calculate number of dots based on screen size and job count
  const calculateDots = () => {
    if (typeof window === 'undefined') return 0;
    const isMobile = window.innerWidth < 768;
    return isMobile ? jobs.length : Math.ceil(jobs.length / 3);
  };

  const [dotCount, setDotCount] = useState(calculateDots());

  useEffect(() => {
    const container = document.getElementById('jobsScrollContainer');
    if (!container) return;

    const handleResize = () => {
      setDotCount(calculateDots());
      updateActiveDot(container);
    };

    const updateActiveDot = (container) => {
      const dots = document.querySelectorAll('.scroll-dot');
      if (!dots.length) return;
      
      const scrollPosition = container.scrollLeft;
      const cardWidth = container.offsetWidth;
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const activeIndex = Math.round((scrollPosition / Math.max(scrollWidth, 1)) * (dotCount - 1));
      
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
      });
    };

    const handleScroll = () => updateActiveDot(container);
    
    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Initial update
    handleResize();
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [jobs.length, dotCount]);

  return (
    <div>
      <Header />
      <section className="careers-hero">
        <div className="container">
          <div className="careers-hero-content">
            <h1>Shape the Future of Human Wellness</h1>
            <p>Join Alelken in building transformative technology solutions that enhance human potential and create meaningful impact across diverse communities. We're seeking exceptional talent to help us redefine how technology serves humanity.</p>
          </div>
        </div>
      </section>

      <section className="company-culture">
        <div className="container">
          <h2>Our Culture & Values</h2>
          <p className="section-subtitle">At Alelken, we foster an environment where innovation meets purpose, and every team member contributes to our mission of human-centered technology development.</p>
          <div className="culture-grid">
            <div className="culture-item">
              <i className="fas fa-lightbulb culture-icon" aria-hidden="true" />
              <h3>Innovation-Driven</h3>
              <p>We encourage creative problem-solving and cutting-edge approaches to complex challenges in wellness technology.</p>
            </div>
            <div className="culture-item">
              <i className="fas fa-heart culture-icon" aria-hidden="true" />
              <h3>Purpose-Oriented</h3>
              <p>Every project and decision is guided by our commitment to improving human wellbeing and creating positive societal impact.</p>
            </div>
            <div className="culture-item">
              <i className="fas fa-users culture-icon" aria-hidden="true" />
              <h3>Collaborative Excellence</h3>
              <p>We believe in the power of diverse perspectives and cross-functional collaboration to achieve extraordinary results.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="benefits-section">
        <div className="container">
          <h2>Why Choose Alelken</h2>
          <p className="section-subtitle">We offer more than just a career—we provide a platform for professional growth, meaningful work, and the opportunity to shape the future of wellness technology.</p>
          <div className="benefits-grid">
            <Card className="benefit-card" title="Impactful Work">
              Contribute to solutions that directly improve lives and address real-world challenges in human wellness and personal development.
            </Card>
            <Card className="benefit-card" title="Professional Development">
              Access to cutting-edge training, conferences, certifications, and mentorship programs to accelerate your career growth.
            </Card>
            <Card className="benefit-card" title="Flexible Environment">
              Hybrid work models, flexible scheduling, and a results-oriented culture that prioritizes productivity and work-life integration.
            </Card>
            <Card className="benefit-card" title="Competitive Package">
              Comprehensive benefits including health coverage, equity participation, performance bonuses, and wellness programs.
            </Card>
            <Card className="benefit-card" title="Innovation Freedom">
              Autonomy to explore new ideas, experiment with emerging technologies, and contribute to product strategy and development.
            </Card>
            <Card className="benefit-card" title="Diverse Community">
              Work alongside talented professionals from varied backgrounds, fostering an inclusive environment that celebrates different perspectives.
            </Card>
          </div>
        </div>
      </section>

      <section className="jobs-section">
        <div className="container">
          <h2>Current Opportunities</h2>
          <p className="section-subtitle">Explore our open positions across engineering, design, business development, and operations. Find the role that aligns with your expertise and career aspirations.</p>
          <div className={`jobs-container${expanded ? ' expanded' : ''}`}>
            <div className="jobs-scroll-container" id="jobsScrollContainer">
              {jobs.map(job => (
                <div key={job.id} className="job-card">
                  <h3>{job.title}</h3>
                  <div className="job-meta">
                    <span><i className="fas fa-map-marker-alt" />{job.location}</span>
                    <span><i className="fas fa-clock" />{job.type}</span>
                  </div>
                  <p>{job.description}</p>
                  <button className="btn" onClick={() => setSelectedJob(job)}>
                    View Details
                  </button>
                </div>
              ))}
            </div>
            <div className="scroll-dots">
              {[...Array(dotCount)].map((_, idx) => (
                <span 
                  key={idx} 
                  className={`scroll-dot ${idx === 0 ? 'active' : ''}`}
                  onClick={() => {
                    const container = document.getElementById('jobsScrollContainer');
                    if (container) {
                      const scrollWidth = container.scrollWidth - container.clientWidth;
                      const scrollLeft = (idx / (dotCount - 1 || 1)) * scrollWidth;
                      container.scrollTo({
                        left: scrollLeft,
                        behavior: 'smooth'
                      });
                    }
                  }}
                />
              ))}
            </div>
          </div>
          <div className="expand-jobs-container">
            <button
              className="expand-jobs-btn"
              id="expandJobsBtn"
              onClick={() => setExpanded(!expanded)}
            >
              <span>{expanded ? 'Show Less' : 'View All Opportunities'}</span>
              <i className={`fas fa-chevron-${expanded ? 'up' : 'down'}`} />
            </button>
          </div>
        </div>
      </section>

      <section className="join-mission">
        <div className="container">
          <h2>Ready to Make an Impact?</h2>
          <p className="section-subtitle">If you're passionate about using technology to solve meaningful problems and want to be part of a team that's building the future of human wellness, we'd love to hear from you.</p>
          <div className="mission-cta">
            <p>Don't see the perfect role? We're always interested in connecting with exceptional talent who share our vision.</p>
            <a href="mailto:careers@alelken.com" className="cta-button">Get in Touch</a>
          </div>
        </div>
      </section>

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