import React, { useRef, useState } from "react";

const JobModal = ({ job, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef(null);

  if (!job) return null;

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="job-modal-overlay" onClick={onClose}>
      <div className="job-modal" onClick={e => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>&times;</button>
        <h3>Apply for {job.title}</h3>
        {submitted ? (
          <div className="thank-you">Thank you for applying!</div>
        ) : (
          <form className="apply-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <div className="file-upload" onClick={() => fileRef.current.click()}>
              Upload CV
              <input ref={fileRef} type="file" style={{ display: 'none' }} required />
            </div>
            <button type="submit" className="btn">Submit Application</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default JobModal;
