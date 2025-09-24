import React, { useEffect, useState, useRef } from "react";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import CultureSection from "../components/careers/CultureSection";
import BenefitsSection from "../components/careers/BenefitsSection";
import JobsSection from "../components/careers/JobsSection";

const Careers = ({ initialJobs = [] }) => {
  const [jobs, setJobs] = useState(initialJobs);
  const jobsGridRef = useRef(null);

  const enableJobs = String(import.meta.env.VITE_ENABLE_JOBS || '').toLowerCase() === 'true';

  useEffect(() => {
    if (!enableJobs) return;
    if (initialJobs.length) return;
    fetch('/data/jobs.json')
      .then(res => res.json())
      .then(data => setJobs(data.jobs))
      .catch(err => console.error('Failed to load jobs', err));
  }, [initialJobs, enableJobs]);

  // Load jobs data
  useEffect(() => {
    if (!enableJobs) return;
    if (initialJobs.length) return;
    
    fetch('/data/jobs.json')
      .then(res => res.json())
      .then(data => setJobs(data.jobs))
      .catch(err => console.error('Failed to load jobs', err));
  }, [initialJobs, enableJobs]);

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
            <div className="hero-media-card glass soft-border" aria-hidden="true">
              <img 
                src="/assets/images/mental_wellness.jpg" 
                alt="Mental Wellness" 
                loading="lazy" 
                decoding="async" 
                width="800"
                height="600"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
          </div>
        </section>

        <CultureSection />
        <BenefitsSection />

        {enableJobs && <JobsSection jobs={jobs} jobsGridRef={jobsGridRef} />}
      </main>
      <Footer />
    </div>
  );
}

export default Careers;
