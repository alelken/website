/**
 * Critical CSS utilities to prevent FOUC (Flash of Unstyled Content)
 * Inlines essential styles immediately to prevent HTML skeleton flashing
 */

/**
 * Critical CSS that must be loaded immediately to prevent FOUC
 * This includes base styles, colors, and layout fundamentals
 */
export const CRITICAL_CSS = `
/* Critical CSS - Prevents FOUC */
*,*::before,*::after{box-sizing:border-box}
*{margin:0;padding:0}
html{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility;scroll-behavior:smooth}
body{font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-size:16px;line-height:1.5;color:#1F2926;background-color:#FEFDFB;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;overflow-x:hidden}

/* Critical Colors */
:root{
--color-night:#2F3E3B;
--color-night-deep:#1F2926;
--color-olive:#8B7E53;
--color-cream-soft:#F5F3ED;
--color-white-warm:#FEFDFB;
--color-text-primary:#1F2926;
--color-text-on-dark:#FEFDFB;
--color-background-primary:#FEFDFB;
--color-background-dark:#2F3E3B;
}

/* Critical Layout */
.app{min-height:100vh;display:flex;flex-direction:column;background-color:var(--color-night);color:var(--color-text-on-dark)}

/* Hide content until CSS loads */
.loading-skeleton{opacity:0;transition:opacity 0.3s ease}
.css-loaded .loading-skeleton{opacity:1}

/* Critical Typography */
h1,h2,h3,h4,h5,h6{font-weight:700;line-height:1.2;color:var(--color-text-primary);margin-bottom:1rem}
h1{font-size:2.5rem}h2{font-size:2rem}h3{font-size:1.5rem}
p{margin-bottom:1rem;line-height:1.6}

/* Critical Utilities */
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}

/* Prevent flash during asset reload */
.asset-loading{visibility:hidden}
.asset-loaded{visibility:visible}

@media (prefers-reduced-motion: reduce) {
html{scroll-behavior:auto}
*,*::before,*::after{animation-duration:0.01ms !important;animation-iteration-count:1 !important;transition-duration:0.01ms !important}
}
`;

/**
 * Inject critical CSS immediately into the document head
 * This prevents FOUC by providing essential styles before external CSS loads
 */
export function injectCriticalCSS() {
  if (typeof document === 'undefined') return;

  // Check if critical CSS is already injected
  if (document.querySelector('#critical-css')) return;

  const style = document.createElement('style');
  style.id = 'critical-css';
  style.textContent = CRITICAL_CSS;
  
  // Insert at the beginning of head to ensure it loads first
  document.head.insertBefore(style, document.head.firstChild);
  
  console.log('✅ Critical CSS injected - FOUC prevention active');
}

/**
 * Mark CSS as loaded to show content
 */
export function markCSSLoaded() {
  if (typeof document === 'undefined') return;
  
  document.documentElement.classList.add('css-loaded');
  
  // Remove loading skeleton class from all elements
  document.querySelectorAll('.loading-skeleton').forEach(el => {
    el.classList.remove('loading-skeleton');
    el.classList.add('asset-loaded');
  });
}

/**
 * Preload critical fonts to prevent font flash
 */
export function preloadCriticalFonts() {
  if (typeof document === 'undefined') return;

  const fonts = [
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
  ];

  fonts.forEach(fontUrl => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = fontUrl;
    link.onload = () => {
      link.rel = 'stylesheet';
    };
    document.head.appendChild(link);
  });
}

/**
 * Setup smooth CSS loading without FOUC
 */
export function setupSmoothCSSLoading() {
  if (typeof document === 'undefined') return;

  // Inject critical CSS immediately
  injectCriticalCSS();
  
  // Preload critical fonts
  preloadCriticalFonts();
  
  // Mark CSS as loaded when main stylesheet loads
  const mainStylesheet = document.querySelector('link[href*="main.css"]');
  if (mainStylesheet) {
    mainStylesheet.addEventListener('load', markCSSLoaded);
  } else {
    // Fallback: mark as loaded after a short delay
    setTimeout(markCSSLoaded, 100);
  }
  
  // Also mark as loaded when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', markCSSLoaded);
  } else {
    markCSSLoaded();
  }
}

/**
 * Handle CSS reloading during cache invalidation
 */
export function handleCSSReload() {
  if (typeof document === 'undefined') return;

  // Remove the css-loaded class temporarily
  document.documentElement.classList.remove('css-loaded');
  
  // Add loading skeleton to prevent flash
  document.querySelectorAll('.asset-loaded').forEach(el => {
    el.classList.add('loading-skeleton');
    el.classList.remove('asset-loaded');
  });
  
  // Re-setup smooth loading
  setTimeout(() => {
    setupSmoothCSSLoading();
  }, 10);
}

/**
 * Create a loading overlay to hide content during CSS reload
 */
export function createLoadingOverlay() {
  if (typeof document === 'undefined') return null;

  const overlay = document.createElement('div');
  overlay.id = 'css-loading-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #FEFDFB;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
  `;
  
  overlay.innerHTML = `
    <div style="text-align: center; color: #1F2926;">
      <div style="width: 40px; height: 40px; border: 3px solid #8B7E53; border-top: 3px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 16px;"></div>
      <p style="font-family: system-ui, sans-serif; font-size: 14px;">Loading...</p>
    </div>
    <style>
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    </style>
  `;
  
  document.body.appendChild(overlay);
  return overlay;
}

/**
 * Show loading overlay during CSS reload
 */
export function showLoadingOverlay() {
  const overlay = document.getElementById('css-loading-overlay') || createLoadingOverlay();
  if (overlay) {
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'auto';
  }
}

/**
 * Hide loading overlay after CSS loads
 */
export function hideLoadingOverlay() {
  const overlay = document.getElementById('css-loading-overlay');
  if (overlay) {
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    setTimeout(() => {
      overlay.remove();
    }, 200);
  }
}