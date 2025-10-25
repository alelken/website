/**
 * True background cache invalidation - completely invisible to users
 * Uses Web Workers and hidden iframes for zero UX impact
 */

/**
 * Create a hidden iframe for background asset preloading
 */
function createHiddenFrame() {
  const iframe = document.createElement('iframe');
  iframe.style.cssText = `
    position: absolute;
    left: -9999px;
    top: -9999px;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
  `;
  iframe.src = 'about:blank';
  document.body.appendChild(iframe);
  return iframe;
}

/**
 * Preload assets in background without affecting visible DOM
 */
function preloadAssetInBackground(url, type = 'script') {
  return new Promise((resolve) => {
    if (type === 'script') {
      // Use fetch for scripts to avoid execution
      fetch(url, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })
        .then(() => resolve())
        .catch(() => resolve());
    } else if (type === 'style') {
      // Create hidden prefetch link
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      link.onload = () => {
        link.remove();
        resolve();
      };
      link.onerror = () => {
        link.remove();
        resolve();
      };
      document.head.appendChild(link);
    } else {
      // For other assets, use fetch
      fetch(url, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })
        .then(() => resolve())
        .catch(() => resolve());
    }
  });
}

/**
 * Background cache invalidation that doesn't touch visible DOM or images
 */
export function backgroundCacheInvalidation() {
  if (typeof window === 'undefined') return;

  // Get only scripts and stylesheets - NEVER touch images
  const scripts = Array.from(document.querySelectorAll('script[src]'))
    .map(s => s.getAttribute('src'))
    .filter(src => src && !src.startsWith('data:') && !src.includes('/assets/'));
    
  const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
    .map(l => l.getAttribute('href'))
    .filter(href => href && !href.startsWith('data:'));

  // Only preload scripts and stylesheets - images are left alone
  const preloadPromises = [
    ...scripts.map(src => preloadAssetInBackground(src, 'script')),
    ...stylesheets.map(href => preloadAssetInBackground(href, 'style'))
  ];

  // Wait for all preloads to complete silently
  Promise.all(preloadPromises).then(() => {
    console.log('Background cache invalidation completed (images untouched)');
  });
}

/**
 * Setup completely invisible background cache invalidation
 */
export function setupBackgroundCacheInvalidation() {
  if (typeof window === 'undefined') return;

  // Initial background invalidation after page load
  setTimeout(() => {
    backgroundCacheInvalidation();
  }, 2000);

  // Background invalidation on focus (when user returns to tab)
  window.addEventListener('focus', () => {
    setTimeout(backgroundCacheInvalidation, 500);
  });

  // Background invalidation on visibility change
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      setTimeout(backgroundCacheInvalidation, 500);
    }
  });

  // Periodic background invalidation every 30 seconds (less frequent)
  const backgroundInterval = setInterval(() => {
    backgroundCacheInvalidation();
  }, 30000);

  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    clearInterval(backgroundInterval);
  });

  return backgroundInterval;
}

/**
 * Override fetch globally to add no-cache headers without affecting UX
 */
export function setupInvisibleFetchOverride() {
  if (typeof window === 'undefined') return;

  const originalFetch = window.fetch;
  
  window.fetch = function(input, init = {}) {
    // Only add no-cache headers, don't modify URLs or behavior
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

/**
 * Create a Web Worker for background cache operations (if supported)
 */
export function setupWebWorkerCache() {
  if (typeof window === 'undefined' || !window.Worker) return;

  try {
    const workerCode = `
      // Web Worker for background cache operations
      self.addEventListener('message', function(e) {
        if (e.data.type === 'invalidate') {
          // Perform background fetch operations
          const urls = e.data.urls || [];
          
          Promise.all(
            urls.map(url => 
              fetch(url, {
                cache: 'no-store',
                headers: {
                  'Cache-Control': 'no-cache, no-store, must-revalidate',
                  'Pragma': 'no-cache',
                  'Expires': '0'
                }
              }).catch(() => {}) // Ignore errors
            )
          ).then(() => {
            self.postMessage({ type: 'complete' });
          });
        }
      });
    `;

    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const worker = new Worker(URL.createObjectURL(blob));

    // Function to trigger background invalidation via worker
    window.backgroundWorkerInvalidate = (urls) => {
      worker.postMessage({ type: 'invalidate', urls });
    };

    return worker;
  } catch (error) {
    console.log('Web Worker not available, using fallback');
    return null;
  }
}