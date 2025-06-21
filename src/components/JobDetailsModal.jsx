import React from "react";

const JobDetailsModal = ({ job, onClose, onApply }) => {
  if (!job) return null;

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
        <button className="btn" onClick={() => onApply(job)}>
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetailsModal;
