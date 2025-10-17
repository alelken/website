/**
 * SEO Redirect utilities for handling crawlbot redirects
 * Provides HTML meta redirects for hash-based URLs to proper canonical URLs
 */

// Mapping of hash-based routes to canonical paths
const ROUTE_REDIRECTS = {
  '#': '/',
  '#home': '/',
  '#product': '/product',
  '#press': '/press',
  '#about': '/about',
  '#404': '/404',
  '#not-found': '/404'
};

/**
 * Check if the current visitor is a crawlbot/search engine
 * @returns {boolean} True if visitor is likely a crawlbot
 */
export function isCrawlbot() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  const userAgent = navigator.userAgent.toLowerCase();
  const crawlbots = [
    'googlebot',
    'bingbot',
    'slurp', // Yahoo
    'duckduckbot',
    'baiduspider',
    'yandexbot',
    'facebookexternalhit',
    'twitterbot',
    'linkedinbot',
    'whatsapp',
    'telegrambot',
    'applebot',
    'crawler',
    'spider',
    'bot'
  ];

  return crawlbots.some(bot => userAgent.includes(bot));
}

/**
 * Get the canonical URL for a hash-based route
 * @param {string} hash - The current hash (e.g., '#product')
 * @returns {string} The canonical URL path
 */
export function getCanonicalUrl(hash = '') {
  const baseUrl = 'https://alelken.in';
  
  // Handle press detail routes
  if (hash.startsWith('#press/')) {
    const uid = hash.replace('#press/', '');
    return `${baseUrl}/press/${uid}`;
  }
  
  // Handle standard routes
  const canonicalPath = ROUTE_REDIRECTS[hash] || '/';
  return `${baseUrl}${canonicalPath}`;
}

/**
 * Get the canonical path (without domain) for a hash-based route
 * @param {string} hash - The current hash (e.g., '#product')
 * @returns {string} The canonical path
 */
export function getCanonicalPath(hash = '') {
  // Handle press detail routes
  if (hash.startsWith('#press/')) {
    const uid = hash.replace('#press/', '');
    return `/press/${uid}`;
  }
  
  // Handle standard routes
  return ROUTE_REDIRECTS[hash] || '/';
}

/**
 * Create HTML meta redirect for crawlbots
 * @param {string} targetUrl - The target canonical URL
 * @returns {string} HTML meta redirect content
 */
export function createMetaRedirect(targetUrl) {
  return `
    <meta http-equiv="refresh" content="0; url=${targetUrl}">
    <link rel="canonical" href="${targetUrl}">
  `;
}

/**
 * Initialize crawlbot redirect handling
 * This should be called on page load to handle redirects
 */
export function initializeCrawlbotRedirects() {
  if (typeof window === 'undefined') return;

  // Only redirect crawlbots, not regular users
  if (!isCrawlbot()) return;

  const currentHash = window.location.hash;
  
  // If we have a hash-based URL, redirect to canonical URL
  if (currentHash) {
    const canonicalUrl = getCanonicalUrl(currentHash);
    const currentUrl = window.location.href;
    
    // Only redirect if we're actually on a hash-based URL
    if (currentUrl !== canonicalUrl) {
      console.log(`Crawlbot detected, redirecting from ${currentUrl} to ${canonicalUrl}`);
      
      // For crawlbots, use window.location.replace to avoid adding to history
      window.location.replace(canonicalUrl);
    }
  }
}

/**
 * Update page meta tags for SEO
 * @param {Object} metadata - Page metadata object
 * @param {string} canonicalUrl - Canonical URL for the page
 */
export function updatePageMeta(metadata, canonicalUrl) {
  if (typeof document === 'undefined') return;

  // Update title
  if (metadata.title) {
    document.title = metadata.title;
  }

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && metadata.description) {
    metaDescription.setAttribute('content', metadata.description);
  }

  // Update or create canonical link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);

  // Update Open Graph URL
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    ogUrl.setAttribute('content', canonicalUrl);
  }

  // Update Twitter URL
  const twitterUrl = document.querySelector('meta[name="twitter:url"]');
  if (twitterUrl) {
    twitterUrl.setAttribute('content', canonicalUrl);
  }

  // Update Open Graph title
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle && metadata.title) {
    ogTitle.setAttribute('content', metadata.title);
  }

  // Update Open Graph description
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription && metadata.description) {
    ogDescription.setAttribute('content', metadata.description);
  }

  // Update Twitter title
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle && metadata.title) {
    twitterTitle.setAttribute('content', metadata.title);
  }

  // Update Twitter description
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (twitterDescription && metadata.description) {
    twitterDescription.setAttribute('content', metadata.description);
  }
}

/**
 * Generate structured data for the current page
 * @param {Object} metadata - Page metadata
 * @param {string} canonicalUrl - Canonical URL
 * @returns {Object} Structured data object
 */
export function generateStructuredData(metadata, canonicalUrl) {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": metadata.title,
    "description": metadata.description,
    "url": canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Alelken",
      "url": "https://alelken.in"
    }
  };

  // Add specific structured data based on page type
  if (canonicalUrl.includes('/press/')) {
    return {
      ...baseStructuredData,
      "@type": "Article",
      "headline": metadata.title,
      "author": {
        "@type": "Organization",
        "name": "Alelken"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Alelken",
        "url": "https://alelken.in"
      }
    };
  }

  return baseStructuredData;
}

/**
 * Inject structured data into the page
 * @param {Object} structuredData - Structured data object
 */
export function injectStructuredData(structuredData) {
  if (typeof document === 'undefined') return;

  // Remove existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
}