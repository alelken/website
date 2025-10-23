/**
 * Smooth loading system to prevent FOUC and handle asset reloading gracefully
 */

/**
 * Initialize silent loading system (no UI overlay)
 */
export function initSmoothLoading() {
  if (typeof document === 'undefined') return;

  // Silent loading - just mark as loaded when ready
  document.documentElement.classList.add('loading');
  
  // Hide loading state when everything is ready
  const markLoaded = () => {
    document.documentElement.classList.remove('loading');
    document.documentElement.classList.add('loaded');
  };
  
  // Check when DOM and CSS are ready
  let domReady = false;
  let cssReady = false;
  
  const checkReady = () => {
    if (domReady && cssReady) {
      markLoaded();
    }
  };
  
  // Check DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      domReady = true;
      checkReady();
    });
  } else {
    domReady = true;
  }
  
  // Check CSS ready silently
  const checkCSS = () => {
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    let loadedSheets = 0;
    
    if (stylesheets.length === 0) {
      cssReady = true;
      checkReady();
      return;
    }
    
    stylesheets.forEach(sheet => {
      const linkElement = sheet;
      try {
        // Check if stylesheet is loaded
        if (linkElement.sheet && linkElement.sheet.cssRules) {
          loadedSheets++;
        } else {
          linkElement.addEventListener('load', () => {
            loadedSheets++;
            if (loadedSheets >= stylesheets.length) {
              cssReady = true;
              checkReady();
            }
          });
        }
      } catch (e) {
        // Cross-origin stylesheets may throw errors, consider them loaded
        loadedSheets++;
      }
    });
    
    if (loadedSheets >= stylesheets.length) {
      cssReady = true;
      checkReady();
    }
  };
  
  // Check CSS after a brief delay
  setTimeout(checkCSS, 100);
  
  // Fallback: mark as loaded after 2 seconds
  setTimeout(() => {
    if (!document.documentElement.classList.contains('loaded')) {
      markLoaded();
    }
  }, 2000);
}

/**
 * Handle silent asset reloading during cache invalidation (no UI indicators)
 */
export function handleSmoothReload() {
  if (typeof document === 'undefined') return;
  
  // Silent reload - no UI indicators
  // Just return empty functions for compatibility
  return { 
    hideIndicator: () => {} 
  };
}

/**
 * Prevent layout shift during asset reloading
 */
export function preventLayoutShift() {
  if (typeof document === 'undefined') return;
  
  // Add CSS to prevent layout shift
  const style = document.createElement('style');
  style.id = 'layout-shift-prevention';
  style.textContent = `
    /* Prevent layout shift during asset reload */
    .preventing-shift {
      min-height: 100vh;
      overflow: hidden;
    }
    
    .preventing-shift * {
      animation-play-state: paused !important;
      transition: none !important;
    }
    
    /* Smooth transition back */
    .shift-prevented {
      transition: all 0.3s ease;
    }
  `;
  
  document.head.appendChild(style);
  
  // Apply prevention
  document.body.classList.add('preventing-shift');
  
  // Remove prevention after assets load
  setTimeout(() => {
    document.body.classList.remove('preventing-shift');
    document.body.classList.add('shift-prevented');
    
    setTimeout(() => {
      document.body.classList.remove('shift-prevented');
      style.remove();
    }, 300);
  }, 1000);
}

/**
 * Setup complete smooth loading system
 */
export function setupSmoothLoading() {
  if (typeof window === 'undefined') return;
  
  // Initialize only once
  if (!document.getElementById('smooth-loading-overlay')) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initSmoothLoading);
    } else {
      initSmoothLoading();
    }
  }
  
  // Handle asset reloading
  window.addEventListener('beforeunload', () => {
    handleSmoothReload();
  });
  
  // Handle visibility changes
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      handleSmoothReload();
    }
  });
}