/**
 * Image protection system - ensures images are never affected by cache invalidation
 */

/**
 * Protect all images from cache invalidation systems
 */
export function protectAllImages() {
  if (typeof document === 'undefined') return;

  // Mark all existing images as protected
  document.querySelectorAll('img').forEach(img => {
    img.setAttribute('data-cache-protected', 'true');
    
    // Ensure images have stable src attributes
    const src = img.getAttribute('src');
    if (src && !src.startsWith('data:')) {
      // Lock the src to prevent any modifications
      Object.defineProperty(img, 'src', {
        value: src,
        writable: false,
        configurable: false
      });
    }
  });

  // Protect future images
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Protect any new images
          if (node.tagName === 'IMG') {
            node.setAttribute('data-cache-protected', 'true');
          }
          
          // Protect images within added elements
          if (node.querySelectorAll) {
            node.querySelectorAll('img').forEach(img => {
              img.setAttribute('data-cache-protected', 'true');
            });
          }
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  return observer;
}

/**
 * Check if an element should be protected from cache operations
 */
export function isProtectedFromCache(element) {
  return element.hasAttribute('data-cache-protected') || 
         element.tagName === 'IMG' ||
         element.src?.includes('/assets/') ||
         element.href?.includes('/assets/');
}

/**
 * Setup image protection on page load
 */
export function setupImageProtection() {
  if (typeof window === 'undefined') return;

  // Protect images immediately
  protectAllImages();

  // Re-protect on DOM changes
  document.addEventListener('DOMContentLoaded', protectAllImages);
  
  // Protect on page visibility change
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      setTimeout(protectAllImages, 100);
    }
  });
}