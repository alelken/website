/**
 * Smooth loading system to prevent FOUC and handle asset reloading gracefully
 */

/**
 * Initialize smooth loading system
 */
export function initSmoothLoading() {
  if (typeof document === 'undefined') return;

  // Add loading state to document
  document.documentElement.classList.add('loading');
  
  // Create a smooth transition overlay
  const overlay = document.createElement('div');
  overlay.id = 'smooth-loading-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #FEFDFB 0%, #F5F3ED 100%);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
    transition: opacity 0.5s ease;
    pointer-events: none;
  `;
  
  overlay.innerHTML = `
    <div style="text-align: center; color: #1F2926;">
      <div style="
        width: 48px;
        height: 48px;
        border: 3px solid #8B7E53;
        border-top: 3px solid transparent;
        border-radius: 50%;
        animation: smoothSpin 1.2s linear infinite;
        margin: 0 auto 24px;
      "></div>
      <p style="
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 16px;
        font-weight: 500;
        color: #2F3E3B;
        margin: 0;
      ">Loading...</p>
    </div>
    <style>
      @keyframes smoothSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
  `;
  
  document.body.appendChild(overlay);
  
  // Hide overlay when everything is ready
  const hideOverlay = () => {
    overlay.style.opacity = '0';
    document.documentElement.classList.remove('loading');
    document.documentElement.classList.add('loaded');
    
    setTimeout(() => {
      overlay.remove();
    }, 500);
  };
  
  // Hide overlay when DOM is ready and CSS is loaded
  let domReady = false;
  let cssReady = false;
  
  const checkReady = () => {
    if (domReady && cssReady) {
      hideOverlay();
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
  
  // Check CSS ready
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
  
  // Fallback: hide overlay after 3 seconds
  setTimeout(() => {
    if (!document.documentElement.classList.contains('loaded')) {
      hideOverlay();
    }
  }, 3000);
  
  return { hideOverlay };
}

/**
 * Handle smooth asset reloading during cache invalidation
 */
export function handleSmoothReload() {
  if (typeof document === 'undefined') return;
  
  // Show a subtle loading indicator
  const indicator = document.createElement('div');
  indicator.id = 'reload-indicator';
  indicator.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(139, 126, 83, 0.9);
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-family: system-ui, sans-serif;
    font-size: 14px;
    font-weight: 500;
    z-index: 9999;
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    pointer-events: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  `;
  
  indicator.textContent = 'Refreshing assets...';
  document.body.appendChild(indicator);
  
  // Show indicator
  setTimeout(() => {
    indicator.style.opacity = '1';
    indicator.style.transform = 'translateY(0)';
  }, 10);
  
  // Hide indicator after reload
  const hideIndicator = () => {
    indicator.style.opacity = '0';
    indicator.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      indicator.remove();
    }, 300);
  };
  
  // Auto-hide after 2 seconds
  setTimeout(hideIndicator, 2000);
  
  return { hideIndicator };
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