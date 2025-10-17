/**
 * Cache utilities for asset loading with minute-based invalidation
 */

/**
 * Get cache-busting timestamp (rounded to nearest minute)
 * This ensures cache is invalidated every minute
 */
export function getCacheTimestamp() {
  const now = new Date();
  return Math.floor(now.getTime() / (60 * 1000)) * (60 * 1000);
}

/**
 * Add cache-busting parameter to a URL
 * @param {string} url - The URL to add cache busting to
 * @returns {string} URL with cache parameter
 */
export function addCacheBuster(url) {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${getCacheTimestamp()}`;
}

/**
 * Load a script with cache busting
 * @param {string} src - Script source URL
 * @returns {Promise} Promise that resolves when script loads
 */
export function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = addCacheBuster(src);
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

/**
 * Load a stylesheet with cache busting
 * @param {string} href - Stylesheet URL
 * @returns {Promise} Promise that resolves when stylesheet loads
 */
export function loadStylesheet(href) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = addCacheBuster(href);
    link.onload = resolve;
    link.onerror = reject;
    document.head.appendChild(link);
  });
}

/**
 * Preload an asset with cache busting
 * @param {string} href - Asset URL
 * @param {string} as - Asset type (script, style, image, etc.)
 */
export function preloadAsset(href, as = 'script') {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = addCacheBuster(href);
  link.as = as;
  document.head.appendChild(link);
}

/**
 * Update all existing asset URLs with cache busting
 * This can be called periodically to refresh cache parameters
 */
export function refreshAssetCache() {
  if (typeof document === 'undefined') return;

  const timestamp = getCacheTimestamp();
  
  // Update script tags
  document.querySelectorAll('script[src*="/assets/"]').forEach(script => {
    const originalSrc = script.src.split('?')[0];
    script.src = `${originalSrc}?v=${timestamp}`;
  });
  
  // Update link tags (stylesheets)
  document.querySelectorAll('link[href*="/assets/"]').forEach(link => {
    const originalHref = link.href.split('?')[0];
    link.href = `${originalHref}?v=${timestamp}`;
  });
}

/**
 * Set up automatic cache refresh every minute
 * Call this once during app initialization
 */
export function setupAutoRefresh() {
  if (typeof window === 'undefined') return;
  
  // Refresh cache every minute
  const refreshInterval = setInterval(() => {
    refreshAssetCache();
  }, 60 * 1000);
  
  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    clearInterval(refreshInterval);
  });
  
  return refreshInterval;
}