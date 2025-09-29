import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { FiMenu, FiX, FiChevronDown, FiSun, FiMoon } from 'react-icons/fi';
import useDarkMode from '../hooks/useDarkMode'

// Breakpoint for mobile/desktop view
const MOBILE_BREAKPOINT = 1024;
const ENABLE_THEME_TOGGLE = (import.meta.env.VITE_ENABLE_THEME_TOGGLE ?? 'true') === 'true'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Product', path: '/product' },
  { name: 'Careers', path: '/careers' }
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef(null);
  const controls = useAnimation();
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, 100], [1, 0.7]);
  const [darkEnabled, setDarkEnabled] = useDarkMode();
  const toggleTheme = useCallback(() => setDarkEnabled((v) => !v), [setDarkEnabled]);

  // Check if mobile view
  const checkIfMobile = useCallback(() => {
    const mobile = window.innerWidth < MOBILE_BREAKPOINT;
    setIsMobile(mobile);

    // Close mobile menu when resizing to desktop
    if (!mobile && isOpen) {
      setIsOpen(false);
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Toggle mobile menu with haptic feedback (mobile only)
  const toggleMenu = useCallback(() => {
    if (!isMobile) return;

    // Haptic feedback for mobile devices
    if (isMobile && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }

    const newState = !isOpen;
    setIsOpen(newState);

    // Prevent body scroll when menu is open (mobile only)
    if (isMobile) {
      document.body.style.overflow = newState ? 'hidden' : '';
    }

    if (newState) {
      controls.start('visible');
    }
  }, [isMobile, isOpen, controls]);

  // Handle touch gestures for menu (mobile only)
  const handleTouchStart = useCallback((e) => {
    if (!isMobile) return;
    const touch = e.touches[0];
    y.set(touch.clientY);
  }, [isMobile, y]);

  const handleTouchMove = useCallback((e) => {
    if (!isMobile) return;
    const touch = e.touches[0];
    const deltaY = touch.clientY - y.get();

    if (deltaY > 50 && isOpen) {
      toggleMenu();
    }
  }, [isMobile, isOpen, toggleMenu, y]);

  // Handle window resize and set initial mobile state
  useEffect(() => {
    checkIfMobile();

    const handleResize = () => {
      checkIfMobile();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [checkIfMobile]);

  // Close menu when clicking outside or pressing escape (mobile only)
  useEffect(() => {
    if (!isMobile) return;

    const handleClickOutside = (e) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target) && !e.target.closest('.menu-button')) {
        toggleMenu();
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        toggleMenu();
      }
    };

    // Only add mobile-specific event listeners
    if (isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside, { passive: true });
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchstart', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, isMobile, toggleMenu]);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className={`header-gradient glass ${scrolled ? 'scrolled' : ''}`}>
        <nav>
          <div className="logo">
            <a href="/" aria-label="Home">
              <img
                src={'/assets/images/logo_light.png'}
                alt="Alelken"
                className="nav-logo hover-float"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-links">
            {navItems.map((item) => (
              <div key={item.path} className="relative group">
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `nav-link hover-float${isActive ? ' active' : ''}`}
                  end
                >
                  {item.name}
                  {item.submenu && (
                    <FiChevronDown className="ml-1 transition-transform" />
                  )}
                  <span className="nav-link-underline" />
                </NavLink>

                {/* Desktop Dropdown */}
                {item.submenu && !isMobile && (
                  <div
                    className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50 hidden group-hover:block"
                  >
                    {item.submenu.map((subItem) => (
                      <NavLink
                        key={subItem.path}
                        to={subItem.path}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {subItem.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="nav-actions">

            {/* Mobile Menu Button - Only visible on mobile */}
            <button
              className="menu-button p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden"
              onClick={toggleMenu}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      {/* Modern Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            ref={menuRef}
            className="modern-mobile-nav"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            {/* Header */}
            <div className="mobile-nav-header">
              <motion.img
                src={'/assets/images/logo_light.png'}
                alt="Alelken"
                className="mobile-nav-logo"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              />
              <motion.button
                className="mobile-nav-close"
                onClick={toggleMenu}
                aria-label="Close menu"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX size={24} />
              </motion.button>
            </div>

            {/* Navigation Links */}
            <div className="mobile-nav-content">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `modern-mobile-nav-link${isActive ? ' active' : ''}`}
                    onClick={toggleMenu}
                    end
                  >
                    <span className="nav-link-text">{item.name}</span>
                    <span className="nav-link-arrow">→</span>
                  </NavLink>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <motion.div
              className="mobile-nav-footer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="mobile-nav-social">
                <p className="mobile-nav-tagline">Building the future of wellness technology</p>
                <p className="mobile-nav-copyright">© {new Date().getFullYear()} Alelken. All rights reserved.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
