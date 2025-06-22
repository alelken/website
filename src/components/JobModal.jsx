import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const JobModal = ({ job, onClose }) => {
  const [submitted, setSubmitted] = useState(false);

  if (!job) return null;

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get('name');
    const email = data.get('email');
    const cvLink = data.get('cv');
    try {
      await addDoc(collection(db, 'applications'), {
        name,
        email,
        cvLink,
        jobId: job.id,
        jobTitle: job.title,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting application', err);
    }
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
            <input name="name" type="text" placeholder="Your Name" required />
            <input name="email" type="email" placeholder="Your Email" required />
            <input name="cv" type="url" placeholder="Link to Your CV" required />
            <button type="submit" className="btn">Submit Application</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default JobModal;
