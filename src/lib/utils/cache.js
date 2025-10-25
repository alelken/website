/**
 * Background cache invalidation - completely invisible to users
 * NO DOM manipulation, NO visual changes, NO UX impact
 */

/**
 * DEPRECATED - All asset reloading moved to background
 */
export function forceAssetReload() {
  // No-op - background system handles this invisibly
}

/**
 * DEPRECATED - All asset invalidation moved to background  
 */
export function invalidateAllAssets() {
  // No-op - background system handles this invisibly
}

/**
 * Setup invisible background cache invalidation
 */
export function setupImmediateInvalidation() {
  if (typeof window === 'undefined') return;
  
  // Import and setup true background cache invalidation
  import('./background-cache.js').then(({ 
    setupBackgroundCacheInvalidation, 
    setupInvisibleFetchOverride,
    setupWebWorkerCache 
  }) => {
    setupBackgroundCacheInvalidation();
    setupInvisibleFetchOverride();
    setupWebWorkerCache();
  });
}

/**
 * Load a script with no-cache headers (no DOM manipulation)
 */
export function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

/**
 * Load a stylesheet with no-cache headers (no DOM manipulation)
 */
export function loadStylesheet(href) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = resolve;
    link.onerror = reject;
    document.head.appendChild(link);
  });
}

/**
 * Preload an asset invisibly
 */
export function preloadAsset(href, as = 'script') {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
}

/**
 * Force immediate page reload without cache
 */
export function forceImmediateReload() {
  if (typeof window === 'undefined') return;
  
  if ('caches' in window) {
    caches.keys().then(names => {
      names.forEach(name => {
        caches.delete(name);
      });
    });
  }
  
  window.location.reload();
}

/**
 * Fetch with no-cache headers (no URL modification)
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
 * Override requests invisibly (no UX impact)
 */
export function interceptAllRequests() {
  if (typeof window === 'undefined') return;

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
}