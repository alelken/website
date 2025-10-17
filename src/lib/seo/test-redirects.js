/**
 * Test utilities for SEO redirects
 * Use this to test redirect functionality in development
 */

import { isCrawlbot, getCanonicalUrl, getCanonicalPath } from './redirects.js';

/**
 * Test the redirect functionality
 */
export function testRedirects() {
    console.log('🧪 Testing SEO redirect functionality...');
    
    // Test crawlbot detection
    console.log('Crawlbot detection:', isCrawlbot());
    
    // Test canonical URL generation
    const testHashes = ['#', '#home', '#product', '#press', '#about', '#press/test-article'];
    
    testHashes.forEach(hash => {
        const canonicalUrl = getCanonicalUrl(hash);
        const canonicalPath = getCanonicalPath(hash);
        console.log(`${hash} -> ${canonicalPath} (${canonicalUrl})`);
    });
    
    // Test current page redirect
    if (typeof window !== 'undefined') {
        const currentHash = window.location.hash;
        const currentCanonical = getCanonicalUrl(currentHash);
        console.log(`Current: ${currentHash} -> ${currentCanonical}`);
        
        if (currentHash && currentCanonical !== window.location.href) {
            console.log('⚠️  Current page would redirect to:', currentCanonical);
        } else {
            console.log('✅ Current page is canonical');
        }
    }
}

/**
 * Simulate crawlbot behavior for testing
 */
export function simulateCrawlbot() {
    if (typeof navigator !== 'undefined') {
        // Temporarily modify user agent for testing
        Object.defineProperty(navigator, 'userAgent', {
            value: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
            configurable: true
        });
        
        console.log('🤖 Simulating Googlebot user agent');
        console.log('Crawlbot detected:', isCrawlbot());
        
        // Reset after 5 seconds
        setTimeout(() => {
            location.reload();
        }, 5000);
    }
}

// Auto-run tests in development
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    // Add test functions to window for manual testing
    window.testRedirects = testRedirects;
    window.simulateCrawlbot = simulateCrawlbot;
    
    console.log('🔧 SEO redirect test functions available:');
    console.log('  - testRedirects(): Test redirect URL generation');
    console.log('  - simulateCrawlbot(): Simulate crawlbot behavior');
}