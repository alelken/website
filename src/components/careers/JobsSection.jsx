import React from 'react';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const JobsSection = ({ jobs = [], jobsGridRef }) => {
  return (
    <section className="jobs-section brand-section">
      <div className="container">
        <h2 className="section-title center-title no-bar">
          <span className="doodle-underline">Current Opportunities</span>
        </h2>
        <p className="section-subtitle">
          Explore our open positions across engineering, design, business development, and operations. Find the role that aligns with your expertise and career aspirations.
        </p>
        <div className="jobs-container">
          <div className="jobs-grid" ref={jobsGridRef}>
            {jobs.map(job => (
              <div key={job.id} className="job-card animated-scale-in">
                <h3>{job.title}</h3>
                <div className="job-meta">
                  <span><FaMapMarkerAlt style={{ verticalAlign: 'middle' }} /> {job.location}</span>
                  <span><FaClock style={{ verticalAlign: 'middle' }} /> {job.type}</span>
                </div>
                <p>{job.description}</p>
                <a 
                  href={`mailto:careers@alelken.com?subject=Application for ${job.title}`}
                  className="btn cta-button hover-float animated-pop"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobsSection;