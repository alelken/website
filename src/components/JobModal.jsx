import React, { useRef, useState } from "react";
import { db } from "../firebase.js";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";

const JobModal = ({ job, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const fileRef = useRef(null);

  if (!job) return null;

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      let resumeUri = null;
      const resumeFile = fileRef.current.files[0];
      if (resumeFile) {
        const configSnap = await getDoc(doc(db, 'config', 'mongodb'));
        if (!configSnap.exists()) throw new Error('Upload URI not configured');
        const uploadUri = configSnap.data().uri;

        const formData = new FormData();
        formData.append('file', resumeFile);
        const res = await fetch(uploadUri, {
          method: 'POST',
          body: formData,
        });
        if (!res.ok) throw new Error('Upload failed');
        const data = await res.json();
        resumeUri = data.uri;
      }

      await addDoc(collection(db, 'applications'), {
        jobId: job.id,
        jobTitle: job.title,
        name,
        email,
        resumeUri,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Failed to submit application. Please try again later.');
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
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <div className="file-upload" onClick={() => fileRef.current.click()}>
              Upload CV
              <input ref={fileRef} type="file" style={{ display: 'none' }} required />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="btn">Submit Application</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default JobModal;
