import React, { useState } from "react";

const JobModal = ({ job, onClose }) => {
  const [submitted, setSubmitted] = useState(false);

  if (!job) return null;

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="job-modal-overlay" onClick={onClose}>
      <div className="job-modal" onClick={e => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>&times;</button>
        <h3>{job.title}</h3>
        <p>{job.description}</p>
        <div className="job-details">
          <h4>Requirements</h4>
          <ul>
            {job.requirements.map(req => (
              <li key={req}>{req}</li>
            ))}
          </ul>
          <h4>Benefits</h4>
          <ul>
            {job.benefits.map(b => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
        {submitted ? (
          <div className="thank-you">Thank you for applying!</div>
        ) : (
          <form className="apply-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="file" />
            <button type="submit" className="btn">Submit Application</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default JobModal;
