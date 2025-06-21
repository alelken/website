import React, { useEffect, useState } from "react";
import useMobileNav from "../hooks/useMobileNav";
import Footer from "../components/Footer.jsx";
import JobModal from "../components/JobModal.jsx";
import JobDetailsModal from "../components/JobDetailsModal.jsx";

const Careers = () => {
  useMobileNav();
  const [jobs, setJobs] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyingJob, setApplyingJob] = useState(null);

  useEffect(() => {
    fetch('/data/jobs.json')
      .then(res => res.json())
      .then(data => setJobs(data.jobs))
      .catch(err => console.error('Failed to load jobs', err));
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
  <section className="careers-hero">
    <div className="container">
      <div className="careers-hero-content">
        <h1>Join Our Mission</h1>
        <p>Help us build the future of mental wellness technology. We're looking for passionate individuals who share our vision of creating meaningful impact through innovation.</p>
      </div>
    </div>
  </section>
  <section className="benefits-section">
    <div className="container">
      <h2>Why Work With Us</h2>
      <p className="section-subtitle">Join a team that values innovation, work-life balance, and making a real difference in people's lives.</p>
      <div className="benefits-grid">
        <div className="benefit-card">
          <h3>Meaningful Impact</h3>
          <p>Work on technology that directly improves people's mental well-being and quality of life.</p>
        </div>
        <div className="benefit-card">
          <h3>Growth &amp; Learning</h3>
          <p>Continuous opportunities for professional development and skill enhancement.</p>
        </div>
        <div className="benefit-card">
          <h3>Work-Life Balance</h3>
          <p>Flexible schedules, remote work options, and a supportive work environment.</p>
        </div>
      </div>
    </div>
  </section>
  <section className="jobs-section">
    <div className="container">
      <h2>Open Positions</h2>
      <p className="section-subtitle">Explore our current job opportunities and find the perfect role to advance your career while making a difference.</p>
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
                Show More
              </button>
            </div>
          ))}
        </div>
        <div className="scroll-indicator">
          <i className="fas fa-chevron-right" />
        </div>
      </div>
      <div className="expand-jobs-container">
        <button
          className="expand-jobs-btn"
          id="expandJobsBtn"
          onClick={() => setExpanded(!expanded)}
        >
          <span>{expanded ? 'Collapse' : 'View All Positions'}</span>
          <i className={`fas fa-chevron-${expanded ? 'up' : 'down'}`} />
        </button>
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
