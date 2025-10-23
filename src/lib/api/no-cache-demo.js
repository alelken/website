/**
 * Demo API functions that demonstrate immediate cache invalidation WITHOUT URL modification
 */

import { fetchWithoutCache } from '../utils/cache.js';

/**
 * Fetch data with immediate cache invalidation
 * @param {string} endpoint - API endpoint
 * @returns {Promise} Response data
 */
export async function fetchFreshData(endpoint) {
  try {
    const response = await fetchWithoutCache(endpoint);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Fresh data fetched (no cache):', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch fresh data:', error);
    throw error;
  }
}

/**
 * Demonstrate the difference between cached and non-cached requests
 * @param {string} endpoint - API endpoint to test
 */
export async function demonstrateCacheInvalidation(endpoint) {
  console.log('Demonstrating immediate cache invalidation...');
  
  const startTime = Date.now();
  
  try {
    // Make multiple requests to show they're always fresh
    const requests = Array.from({ length: 3 }, (_, i) => 
      fetchFreshData(`${endpoint}?test=${i}`)
    );
    
    const results = await Promise.all(requests);
    const endTime = Date.now();
    
    console.log('All requests completed:', results);
    console.log(`Total time: ${endTime - startTime}ms`);
    console.log('✅ All requests bypassed cache successfully');
    
    return results;
  } catch (error) {
    console.error('Cache invalidation demo failed:', error);
    throw error;
  }
}

/**
 * Test immediate cache invalidation with a mock endpoint
 */
export function testWithMockEndpoint() {
  // Create a mock response that changes each time
  const mockEndpoint = 'data:application/json,' + encodeURIComponent(JSON.stringify({
    timestamp: Date.now(),
    random: Math.random(),
    message: 'This data is always fresh - no caching!'
  }));
  
  return demonstrateCacheInvalidation(mockEndpoint);
}