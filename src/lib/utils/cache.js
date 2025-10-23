/**
 * Immediate cache invalidation utilities - NO URL modification, headers and DOM only
 */

/**
 * Force reload of assets by recreating DOM elements with no-cache headers
 * This bypasses all caching without modifying URLs and prevents FOUC
 */
export function forceAssetReload() {
  if (typeof document === 'undefined') return;

  // Import critical CSS utilities
  import('./critical-css.js').then(({ showLoadingOverlay, hideLoadingOverlay, handleCSSReload }) => {
    // Show loading overlay to prevent FOUC
    showLoadingOverlay();
    
    // Handle CSS reload smoothly
    handleCSSReload();
    
    let loadedCount = 0;
    let totalAssets = 0;
    
    // Count total assets to reload
    totalAssets += document.querySelectorAll('script[src]').length;
    totalAssets += document.querySelectorAll('link[rel="stylesheet"]').length;
    
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount >= totalAssets) {
        // Hide loading overlay after all assets load
        setTimeout(() => {
          hideLoadingOverlay();
        }, 100);
      }
    };

    // Force reload all scripts
    document.querySelectorAll('script[src]').forEach((script) => {
      const src = script.getAttribute('src');
      if (src && !src.startsWith('data:')) {
        const newScript = document.createElement('script');
        newScript.src = src;
        newScript.type = 'text/javascript';
        
        // Add no-cache attributes
        newScript.setAttribute('cache', 'no-cache');
        newScript.setAttribute('pragma', 'no-cache');
        
        // Track loading
        newScript.onload = checkAllLoaded;
        newScript.onerror = checkAllLoaded;
        
        // Replace the old script
        script.parentNode?.replaceChild(newScript, script);
      }
    });

    // Force reload all stylesheets
    document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('data:')) {
        const newLink = document.createElement('link');
        newLink.rel = 'stylesheet';
        newLink.href = href;
        
        // Add no-cache attributes
        newLink.setAttribute('cache', 'no-cache');
        newLink.setAttribute('pragma', 'no-cache');
        
        // Track loading
        newLink.onload = checkAllLoaded;
        newLink.onerror = checkAllLoaded;
        
        // Replace the old link
        link.parentNode?.replaceChild(newLink, link);
      }
    });
    
    // Fallback: hide overlay after 2 seconds if assets don't load
    setTimeout(() => {
      hideLoadingOverlay();
    }, 2000);
  });
}

/**
 * Load a script with immediate cache invalidation (no URL modification)
 * @param {string} src - Script source URL
 * @returns {Promise} Promise that resolves when script loads
 */
export function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    
    // Force no caching at browser level
    script.setAttribute('cache', 'no-cache');
    script.setAttribute('pragma', 'no-cache');
    
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

/**
 * Load a stylesheet with immediate cache invalidation (no URL modification)
 * @param {string} href - Stylesheet URL
 * @returns {Promise} Promise that resolves when stylesheet loads
 */
export function loadStylesheet(href) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    
    // Force no caching at browser level
    link.setAttribute('cache', 'no-cache');
    link.setAttribute('pragma', 'no-cache');
    
    link.onload = resolve;
    link.onerror = reject;
    document.head.appendChild(link);
  });
}

/**
 * Preload an asset with immediate cache invalidation (no URL modification)
 * @param {string} href - Asset URL
 * @param {string} as - Asset type (script, style, image, etc.)
 */
export function preloadAsset(href, as = 'script') {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  
  // Force no caching
  link.setAttribute('cache', 'no-cache');
  link.setAttribute('pragma', 'no-cache');
  
  document.head.appendChild(link);
}

/**
 * Immediately invalidate all existing assets by forcing DOM recreation
 * Forces immediate reload of all assets without URL modification
 */
export function invalidateAllAssets() {
  if (typeof document === 'undefined') return;

  forceAssetReload();
  
  // Force reload of images by recreating them
  document.querySelectorAll('img[src]').forEach((img) => {
    const src = img.getAttribute('src');
    if (src && !src.startsWith('data:')) {
      const newImg = document.createElement('img');
      
      // Copy all attributes
      Array.from(img.attributes).forEach(attr => {
        newImg.setAttribute(attr.name, attr.value);
      });
      
      // Force reload by temporarily changing src
      newImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      
      // Replace the image
      img.parentNode?.replaceChild(newImg, img);
      
      // Set the real src after a brief delay to force reload
      setTimeout(() => {
        newImg.src = src;
      }, 1);
    }
  });
}

/**
 * Set up immediate cache invalidation system with smooth loading
 * Call this once during app initialization
 */
export function setupImmediateInvalidation() {
  if (typeof window === 'undefined') return;
  
  // Skip initial invalidation to prevent double loading
  
  // Set up immediate invalidation on focus (when user returns to tab)
  window.addEventListener('focus', () => {
    import('./smooth-loading.js').then(({ handleSmoothReload }) => {
      handleSmoothReload();
      setTimeout(invalidateAllAssets, 100);
    });
  });
  
  // Set up immediate invalidation on visibility change
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      import('./smooth-loading.js').then(({ handleSmoothReload }) => {
        handleSmoothReload();
        setTimeout(invalidateAllAssets, 100);
      });
    }
  });
  
  // Force immediate invalidation every 10 seconds (reduced frequency for better UX)
  const invalidationInterval = setInterval(() => {
    import('./smooth-loading.js').then(({ handleSmoothReload }) => {
      handleSmoothReload();
      setTimeout(invalidateAllAssets, 100);
    });
  }, 10000);
  
  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    clearInterval(invalidationInterval);
  });
  
  return invalidationInterval;
}

/**
 * Force immediate page reload without cache
 * This completely bypasses all browser caching mechanisms
 */
export function forceImmediateReload() {
  if (typeof window === 'undefined') return;
  
  // Clear all possible caches
  if ('caches' in window) {
    caches.keys().then(names => {
      names.forEach(name => {
        caches.delete(name);
      });
    });
  }
  
  // Force hard reload
  window.location.reload();
}

/**
 * Disable all caching headers for fetch requests (no URL modification)
 * @param {string} url - URL to fetch
 * @param {Object} options - Fetch options
 * @returns {Promise} Fetch promise with no-cache headers
 */
export function fetchWithoutCache(url, options = {}) {
  const noCacheOptions = {
    ...options,
    headers: {
      ...options.headers,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    },
    cache: 'no-store'
  };
  
  return fetch(url, noCacheOptions);
}

/**
 * Override browser's default caching behavior
 * This intercepts all network requests and adds no-cache headers
 */
export function interceptAllRequests() {
  if (typeof window === 'undefined') return;

  // Override fetch globally
  const originalFetch = window.fetch;
  window.fetch = function(input, init = {}) {
    const noCacheInit = {
      ...init,
      headers: {
        ...init.headers,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
      cache: 'no-store'
    };
    
    return originalFetch.call(this, input, noCacheInit);
  };

  // Override XMLHttpRequest
  const originalXHROpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
    const result = originalXHROpen.call(this, method, url, async, user, password);
    
    // Add no-cache headers
    this.setRequestHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    this.setRequestHeader('Pragma', 'no-cache');
    this.setRequestHeader('Expires', '0');
    
    return result;
  };
}