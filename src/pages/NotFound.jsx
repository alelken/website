import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const NotFound = () => {
  return (
    <>
      <style>{`
        /* Import global variables */
        @import url('../styles/global/variables.css');
        
        /* Root Variables - Enhanced for 404 page */
        :root {
          --primary-cyan: #00D4FF;
          --primary-blue: #4F46E5;
          --primary-purple: #9333EA;
          --gradient-primary: linear-gradient(135deg, var(--primary-cyan) 0%, var(--primary-blue) 50%, var(--primary-purple) 100%);
          --neutral-white: #FAFBFC;
          --pure-white: #ffffff;
          --text-color: #000000;
          --background: var(--neutral-white);
          --gray-600: #6c757d;
          --gray-700: #495057;
          --gray-800: #343a40;
          --gray-900: #212529;
          --shadow-sm: 0 1px 3px 0 rgba(0, 212, 255, 0.1), 0 1px 2px 0 rgba(0, 212, 255, 0.06);
          --shadow-md: 0 4px 6px -1px rgba(0, 212, 255, 0.1), 0 2px 4px -1px rgba(0, 212, 255, 0.06);
          --shadow-lg: 0 10px 15px -3px rgba(0, 212, 255, 0.1), 0 4px 6px -2px rgba(0, 212, 255, 0.05);
          --shadow-glow: 0 0 20px rgba(0, 212, 255, 0.3);
        }
        /* Base Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: var(--background);
          color: var(--text-color);
          line-height: 1.6;
          overflow-x: hidden;
          font-size: 16px;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Space Grotesk', sans-serif;
          color: var(--text-color);
          margin: 0 0 1.5rem;
          text-align: center;
          transition: color 0.3s ease;
        }
        
        /* Dark mode styles */
        @media (prefers-color-scheme: dark) {
          :root {
            --neutral-white: #1E1E1E;
            --background: #1E1E1E;
            --text-color: #F9F9F9;
            --gray-600: #9ca3af;
            --gray-700: #6b7280;
          }
          
          .not-found-text {
            color: var(--gray-600) !important;
          }
          
          .not-found-image {
            filter: brightness(0.9) contrast(1.1);
          }
        }
        /* Not Found Specific Styles */
        .not-found-container {
          min-height: 100vh;
          background: var(--background);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 6rem 2rem 2rem 2rem;
          position: relative;
          overflow: hidden;
        }
        
        .not-found-content {
          text-align: center;
          max-width: 48rem;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        
        .not-found-image-container {
          margin-bottom: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .not-found-image {
          max-width: 300px;
          width: 100%;
          height: auto;
          border-radius: 16px;
          box-shadow: var(--shadow-lg);
          transition: all 0.3s ease;
        }
        
        .not-found-image:hover {
          transform: scale(1.02);
          box-shadow: var(--shadow-glow);
        }
        
        .not-found-404 {
          font-size: clamp(4rem, 12vw, 8rem);
          font-weight: 800;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          line-height: 1;
          letter-spacing: -0.02em;
        }
        
        .not-found-title {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 700;
          color: var(--gray-900);
          margin-bottom: 1rem;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }
        
        .not-found-text {
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          color: var(--gray-600);
          margin-bottom: 2.5rem;
          line-height: 1.6;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .not-found-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: var(--gradient-primary);
          color: var(--pure-white) !important;
          font-weight: 600;
          font-size: 1rem;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: var(--shadow-md);
          border: none;
          cursor: pointer;
          line-height: 1.25;
          position: relative;
          overflow: hidden;
        }
        
        .not-found-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }
        
        .not-found-button:hover::before {
          left: 100%;
        }
        
        .not-found-button:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-lg), var(--shadow-glow);
          filter: brightness(1.1);
        }
        
        .not-found-button:active {
          transform: translateY(-1px);
        }
        
        .not-found-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 20%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 70% 80%, rgba(79, 70, 229, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 90% 10%, rgba(147, 51, 234, 0.1) 0%, transparent 50%);
          z-index: 1;
        }
        
        /* Mobile Optimizations */
        @media (max-width: 768px) {
          .not-found-container {
            padding: 5rem 1rem 2rem 1rem;
          }
          
          .not-found-image {
            max-width: 250px;
          }
          
          .not-found-button {
            padding: 0.875rem 1.5rem;
            font-size: 0.9375rem;
          }
        }
        
        @media (max-width: 480px) {
          .not-found-container {
            padding: 4rem 1rem 2rem 1rem;
          }
          
          .not-found-image {
            max-width: 200px;
          }
          
          .not-found-button {
            width: 100%;
            max-width: 280px;
            justify-content: center;
          }
        }
      `}</style>
      <Header />
      <div className="not-found-container">
        <div className="not-found-background"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="not-found-content"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="not-found-image-container"
          >
            <img
              src="/assets/images/404/image.png"
              alt="Page Not Found"
              className="not-found-image"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="not-found-title"
          >
            Oops! Page Not Found
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="not-found-text"
          >
            The page you're looking for seems to have wandered off into the digital wilderness.
            Don't worry though – let's get you back on track to discover amazing wellness tools and insights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/"
              className="not-found-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Return Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;