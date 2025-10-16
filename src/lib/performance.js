// Performance optimization utilities for mobile

/**
 * Lazy load images using Intersection Observer
 * @param {HTMLElement} element - The image element to observe
 * @param {Object} options - Configuration options
 */
export function lazyLoadImage(element, options = {}) {
  const {
    rootMargin = '50px',
    threshold = 0.1,
    placeholder = '/assets/placeholder.svg'
  } = options;

  if (!('IntersectionObserver' in window)) {
    // Fallback for browsers without IntersectionObserver
    loadImage(element);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadImage(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin, threshold });

  observer.observe(element);
}

/**
 * Load image with error handling
 * @param {HTMLImageElement} img - The image element
 */
function loadImage(img) {
  const src = img.dataset.src || img.src;
  
  if (src && src !== img.src) {
    img.src = src;
  }
}

/**
 * Preload critical resources
 * @param {Array} resources - Array of resource URLs to preload
 */
export function preloadCriticalResources(resources = []) {
  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    
    if (resource.endsWith('.css')) {
      link.as = 'style';
    } else if (resource.endsWith('.js')) {
      link.as = 'script';
    } else if (resource.match(/\.(jpg|jpeg|png|webp|svg)$/i)) {
      link.as = 'image';
    } else {
      link.as = 'fetch';
      link.crossOrigin = 'anonymous';
    }
    
    link.href = resource;
    document.head.appendChild(link);
  });
}

/**
 * Optimize images for different screen sizes
 * @param {string} baseSrc - Base image source
 * @param {Array} sizes - Array of sizes to generate
 * @returns {string} - Generated srcset string
 */
export function generateResponsiveSrcset(baseSrc, sizes = [400, 800, 1200, 1600]) {
  if (!baseSrc) return '';
  
  const ext = baseSrc.split('.').pop();
  const baseName = baseSrc.replace(`.${ext}`, '');
  
  return sizes
    .map(size => `${baseName}-${size}w.${ext} ${size}w`)
    .join(', ');
}

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance optimization
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {Function} - Throttled function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Check if device is mobile based on user agent and screen size
 * @returns {boolean} - True if mobile device
 */
export function isMobileDevice() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
  const screenSize = window.innerWidth <= 768;
  
  return mobileRegex.test(userAgent.toLowerCase()) || screenSize;
}

/**
 * Check if device supports touch
 * @returns {boolean} - True if touch is supported
 */
export function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Optimize scroll performance with passive listeners
 * @param {HTMLElement} element - Element to attach scroll listener
 * @param {Function} callback - Scroll callback function
 * @param {Object} options - Scroll options
 */
export function optimizedScrollListener(element, callback, options = {}) {
  const { throttleMs = 16, passive = true } = options;
  const throttledCallback = throttle(callback, throttleMs);
  
  element.addEventListener('scroll', throttledCallback, { passive });
  
  return () => {
    element.removeEventListener('scroll', throttledCallback);
  };
}

/**
 * Reduce motion for accessibility
 * @returns {boolean} - True if user prefers reduced motion
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get optimal image format based on browser support
 * @returns {string} - Optimal image format (webp, avif, or fallback)
 */
export function getOptimalImageFormat() {
  // Check for AVIF support
  const avifSupport = new Promise(resolve => {
    const avif = new Image();
    avif.onload = avif.onerror = () => resolve(avif.height === 2);
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  });
  
  // Check for WebP support
  const webpSupport = new Promise(resolve => {
    const webp = new Image();
    webp.onload = webp.onerror = () => resolve(webp.height === 2);
    webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
  
  return Promise.all([avifSupport, webpSupport]).then(([avif, webp]) => {
    if (avif) return 'avif';
    if (webp) return 'webp';
    return 'jpg';
  });
}

/**
 * Critical CSS inlining utility
 * @param {string} css - CSS content to inline
 */
export function inlineCriticalCSS(css) {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}

/**
 * Load non-critical CSS asynchronously
 * @param {string} href - CSS file URL
 */
export function loadNonCriticalCSS(href) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = href;
  link.onload = () => {
    link.rel = 'stylesheet';
  };
  document.head.appendChild(link);
}

/**
 * Service Worker registration for caching
 * @param {string} swPath - Service worker file path
 */
export function registerServiceWorker(swPath = '/sw.js') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(swPath)
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}