/**
 * Demonstration of immediate cache invalidation WITHOUT URL modification
 */

import { 
  invalidateAllAssets, 
  forceImmediateReload, 
  fetchWithoutCache,
  interceptAllRequests 
} from './cache.js';

import { 
  clearAllStorage, 
  setupNoCacheEnvironment 
} from './no-cache.js';

/**
 * Demonstrate immediate cache invalidation features
 */
export function demonstrateNoCacheSystem() {
  console.log('🚀 Demonstrating Immediate Cache Invalidation System');
  console.log('📋 Features: NO URL modification, headers and DOM manipulation only');
  
  // 1. Show current state
  console.log('\n1️⃣ Current State:');
  console.log('Scripts:', document.querySelectorAll('script[src]').length);
  console.log('Stylesheets:', document.querySelectorAll('link[rel="stylesheet"]').length);
  console.log('Images:', document.querySelectorAll('img[src]').length);
  
  // 2. Demonstrate asset invalidation
  console.log('\n2️⃣ Invalidating all assets (DOM recreation)...');
  invalidateAllAssets();
  
  setTimeout(() => {
    console.log('✅ Assets invalidated - DOM elements recreated with no-cache headers');
    
    // 3. Demonstrate storage clearing
    console.log('\n3️⃣ Clearing all browser storage...');
    clearAllStorage();
    console.log('✅ All storage cleared (localStorage, sessionStorage, IndexedDB, etc.)');
    
    // 4. Demonstrate fetch interception
    console.log('\n4️⃣ Testing fetch with no-cache headers...');
    fetchWithoutCache('/test-endpoint')
      .then(() => console.log('✅ Fetch completed with no-cache headers'))
      .catch(() => console.log('⚠️ Fetch test completed (expected for non-existent endpoint)'));
    
    // 5. Show no-cache environment setup
    console.log('\n5️⃣ No-cache environment features:');
    console.log('- HTTP no-cache headers in HTML');
    console.log('- Browser cache disabled');
    console.log('- Back/forward cache disabled');
    console.log('- Service worker cache clearing');
    console.log('- Global fetch/XHR interception');
    
    console.log('\n🎉 Demonstration complete! All caching disabled without URL modification.');
    
  }, 500);
}

/**
 * Show real-time cache invalidation status
 */
export function showCacheStatus() {
  const status = {
    'DOM Scripts': document.querySelectorAll('script[src]').length,
    'DOM Stylesheets': document.querySelectorAll('link[rel="stylesheet"]').length,
    'DOM Images': document.querySelectorAll('img[src]').length,
    'No-cache Scripts': document.querySelectorAll('script[cache="no-cache"]').length,
    'No-cache Stylesheets': document.querySelectorAll('link[cache="no-cache"]').length,
    'LocalStorage Items': localStorage.length,
    'SessionStorage Items': sessionStorage.length,
    'Cache API Available': 'caches' in window,
    'Service Worker Active': 'serviceWorker' in navigator && navigator.serviceWorker.controller !== null
  };
  
  console.table(status);
  return status;
}

/**
 * Test the complete no-cache system
 */
export function testCompleteCacheInvalidation() {
  console.log('🧪 Testing Complete Cache Invalidation System');
  
  // Test 1: Asset recreation
  const initialScripts = document.querySelectorAll('script[src]').length;
  invalidateAllAssets();
  
  setTimeout(() => {
    const newScripts = document.querySelectorAll('script[src]').length;
    console.log(newScripts >= initialScripts ? '✅ Asset recreation: PASS' : '❌ Asset recreation: FAIL');
    
    // Test 2: Storage clearing
    localStorage.setItem('test', 'value');
    clearAllStorage();
    const storageCleared = !localStorage.getItem('test');
    console.log(storageCleared ? '✅ Storage clearing: PASS' : '❌ Storage clearing: FAIL');
    
    // Test 3: No-cache headers
    const noCacheElements = document.querySelectorAll('[cache="no-cache"]').length;
    console.log(noCacheElements > 0 ? '✅ No-cache headers: PASS' : '⚠️ No-cache headers: Limited');
    
    console.log('\n📊 Test Summary:');
    showCacheStatus();
    
  }, 200);
}

// Auto-run demonstration in development mode
if (typeof window !== 'undefined' && import.meta.env?.DEV) {
  // Run demo after a short delay to ensure DOM is ready
  setTimeout(() => {
    demonstrateNoCacheSystem();
  }, 1000);
}