import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const NotFound = () => {
  return (
    <>
      <style>{`
        /* Google Fonts Import */
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');
        /* Root Variables - Light Theme (Default) */
        :root {
          /* Colors */
          --primary-gold: #3B82F6; /* use brand blue instead of gold */
          --primary-navy: #001F3F;
          --neutral-white: #FFFFFF;
          --text-color: #000000;
          --background: #FFFFFF;
          --card-bg: #FFFFFF;
          --card-border: #E0E0E0;
         
          /* Grayscale */
          --gray-50: #f8f9fa;
          --gray-100: #f1f3f5;
          --gray-200: #e9ecef;
          --gray-300: #dee2e6;
          --gray-400: #ced4da;
          --gray-500: #adb5bd;
          --gray-600: #6c757d;
          --gray-700: #495057;
          --gray-800: #343a40;
          --gray-900: #212529;
         
          /* Shadows */
          --shadow-color: rgba(0, 0, 0, 0.1);
          --shadow-sm: 0 1px 2px 0 var(--shadow-color);
          --shadow-md: 0 4px 6px -1px var(--shadow-color), 0 2px 4px -2px var(--shadow-color);
          --shadow-lg: 0 10px 15px -3px var(--shadow-color), 0 4px 6px -4px var(--shadow-color);
          --shadow-xl: 0 20px 25px -5px var(--shadow-color), 0 8px 10px -6px var(--shadow-color);
         
          /* Gradients */
          --gradient-primary: linear-gradient(135deg, var(--primary-gold) 0%, #60A5FA 100%);
          --gradient-secondary: linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%);
          --gradient-accent: linear-gradient(135deg, var(--primary-gold) 0%, #60A5FA 100%);
         
          /* Text colors */
          --text-dark: #212529;
          --text-color: #000000;
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
        /* Button styles */
        .btn {
          transition: all 0.3s ease;
          color: var(--text-color);
          border: 2px solid transparent;
        }
        .btn-primary {
          background-color: var(--primary-gold);
          color: var(--primary-navy);
        }
        .btn-primary:hover {
          background-color: #E6C200;
          transform: translateY(-2px);
          box-shadow: 0 4px 6px var(--shadow-color);
        }
        /* Dark mode styles */
        @media (prefers-color-scheme: dark) {
          :root {
            --neutral-white: #1E1E1E;
            --text-dark: #F9F9F9;
            --primary-gold: #60A5FA; /* blue in dark mode */
            --shadow-color: rgba(0, 0, 0, 0.3);
            --footer-text: var(--gray-300);
            --footer-heading: var(--primary-white);
            --text-color: #F9F9F9; /* Ensure text is light in dark mode */
            --background: #1E1E1E; /* Dark background */
          }
         
          body {
            background: var(--background);
            color: var(--text-color);
          }
          
          .not-found-text {
            color: var(--gray-300) !important;
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
          /* Add extra top padding to account for fixed header height */
          padding: 6rem 1rem 2rem 1rem;
          
          @media (min-width: 768px) {
            padding: 7rem 1rem 3rem 1rem;
          }
        }
        .not-found-content {
          text-align: center;
          max-width: 42rem;
          margin: 0 auto;
        }
        .not-found-404 {
          font-size: 6rem;
          font-weight: 700;
          color: var(--primary-gold);
          margin-bottom: 0.5rem;
          line-height: 1;
          
          @media (min-width: 768px) {
            font-size: 9rem;
            margin-bottom: 1rem;
          }
        }
        .not-found-title {
          font-size: 1.75rem;
          font-weight: 600;
          color: var(--text-color);
          margin-bottom: 1rem;
          line-height: 1.2;
          
          @media (min-width: 768px) {
            font-size: 2.25rem;
            margin-bottom: 1.5rem;
          }
        }
        .not-found-text {
          font-size: 1.1rem;
          color: var(--gray-600);
          margin-bottom: 2rem;
          padding: 0 1rem;
          line-height: 1.6;
          
          @media (min-width: 768px) {
            font-size: 1.25rem;
          }
        }
        .not-found-button {
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1.25rem;
          background-color: var(--primary-gold);
          color: var(--primary-navy) !important;
          font-weight: 600;
          font-size: 0.875rem;
          border-radius: 0.375rem;
          text-decoration: none;
          transition: all 0.2s ease;
          box-shadow: var(--shadow-sm);
          border: none;
          cursor: pointer;
          line-height: 1.25;
          
          @media (max-width: 480px) {
            width: auto;
            min-width: 120px;
            padding: 0.5rem 1rem;
          }
        }
        .not-found-button:hover {
          background-color: #2563EB;
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }
        .not-found-decor {
          margin-top: 4rem;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 2rem;
          opacity: 0.3;
        }
        @media (min-width: 768px) {
          .not-found-decor {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
        .not-found-box {
          height: 5rem;
          width: 5rem;
          background-color: var(--gray-100);
          border-radius: 0.5rem;
        }
      `}</style>
      <Header />
      <div className="not-found-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="not-found-content"
        >
          <h1 className="not-found-404">404</h1>
          <h2 className="not-found-title">Page Not Found</h2>
          <p className="not-found-text">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/"
              className="not-found-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
        <div className="not-found-decor">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.3, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="not-found-box"
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;