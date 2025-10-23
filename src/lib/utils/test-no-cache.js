/**
 * Test utilities for immediate cache invalidation WITHOUT URL modification
 */

import { fetchWithoutCache, forceImmediateReload, invalidateAllAssets } from './cache.js';
import { clearAllStorage } from './no-cache.js';

/**
 * Test immediate cache invalidation functionality WITHOUT URL modification
 */
export function testImmediateCacheInvalidation() {
  console.log('Testing immediate cache invalidation (no URL modification)...');
  
  // Test asset invalidation
  const initialScriptCount = document.querySelectorAll('script[src]').length;
  const initialLinkCount = document.querySelectorAll('link[rel="stylesheet"]').length;
  
  console.log('Initial scripts:', initialScriptCount);
  console.log('Initial stylesheets:', initialLinkCount);
  
  // Force asset invalidation
  invalidateAllAssets();
  
  // Check if assets were recreated
  setTimeout(() => {
    const newScriptCount = document.querySelectorAll('script[src]').length;
    const newLinkCount = document.querySelectorAll('link[rel="stylesheet"]').length;
    
    console.log('Scripts after invalidation:', newScriptCount);
    console.log('Stylesheets after invalidation:', newLinkCount);
    
    if (newScriptCount >= initialScriptCount && newLinkCount >= initialLinkCount) {
      console.log('✅ Asset invalidation working - DOM elements recreated');
    } else {
      console.log('❌ Asset invalidation may have issues');
    }
  }, 100);
  
  // Test storage clearing
  try {
    localStorage.setItem('test', 'value');
    sessionStorage.setItem('test', 'value');
    
    clearAllStorage();
    
    const localTest = localStorage.getItem('test');
    const sessionTest = sessionStorage.getItem('test');
    
    if (!localTest && !sessionTest) {
      console.log('✅ Storage clearing working');
    } else {
      console.log('❌ Storage clearing failed');
    }
  } catch (error) {
    console.log('⚠️ Storage test failed:', error);
  }
  
  // Test fetch without cache
  fetchWithoutCache('/test-endpoint')
    .then(() => {
      console.log('✅ No-cache fetch working');
    })
    .catch(() => {
      console.log('⚠️ No-cache fetch test failed (expected for non-existent endpoint)');
    });
}

/**
 * Monitor cache invalidation in real-time
 */
export function monitorCacheInvalidation() {
  console.log('Starting cache invalidation monitoring...');
  
  let requestCount = 0;
  
  // Override fetch to monitor requests
  const originalFetch = window.fetch;
  window.fetch = function(...args) {
    requestCount++;
    const url = args[0];
    console.log(`Request #${requestCount}:`, url);
    
    // Check if URL has cache-busting parameters
    if (typeof url === 'string' && (url.includes('_cb=') || url.includes('_r='))) {
      console.log('✅ Cache-busting detected in request');
    }
    
    return originalFetch.apply(this, args);
  };
  
  // Monitor asset loading
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node;
          
          // Check for script tags with no-cache attributes
          if (element.tagName === 'SCRIPT' && element.getAttribute && element.getAttribute('src')) {
            const src = element.getAttribute('src');
            const hasNoCache = element.getAttribute('cache') === 'no-cache' || 
                              element.getAttribute('pragma') === 'no-cache';
            if (src && hasNoCache) {
              console.log('✅ No-cache script loaded:', src);
            }
          }
          
          // Check for link tags with no-cache attributes
          if (element.tagName === 'LINK' && element.getAttribute && element.getAttribute('href')) {
            const href = element.getAttribute('href');
            const hasNoCache = element.getAttribute('cache') === 'no-cache' || 
                              element.getAttribute('pragma') === 'no-cache';
            if (href && hasNoCache) {
              console.log('✅ No-cache stylesheet loaded:', href);
            }
          }
        }
      });
    });
  });
  
  observer.observe(document.head, { childList: true, subtree: true });
  
  return () => {
    window.fetch = originalFetch;
    observer.disconnect();
  };
}

/**
 * Display cache invalidation status
 */
export function displayCacheStatus() {
  const status = {
    timestamp: new Date().toISOString(),
    localStorage: localStorage.length,
    sessionStorage: sessionStorage.length,
    cacheAPI: 'caches' in window,
    serviceWorker: 'serviceWorker' in navigator,
    indexedDB: 'indexedDB' in window
  };
  
  console.table(status);
  return status;
}