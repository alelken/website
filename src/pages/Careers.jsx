import React, { useEffect, useState, useRef } from "react";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import CultureSection from "../components/careers/CultureSection";
import BenefitsSection from "../components/careers/BenefitsSection";
import JobsSection from "../components/careers/JobsSection";
import "../styles/careers.css";

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
        <section className="page-header">
          <div className="container">
            <h1>Shape the Future of Human Wellness</h1>
            <p>Join Alelken in building transformative technology solutions that enhance human potential and create meaningful impact across diverse communities. We're seeking exceptional talent to help us redefine how technology serves humanity.</p>
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
