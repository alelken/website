// Simple test script to verify Prismic connection
// Run with: node src/lib/prismic-test.js

import { getPressReleases, getCompanyInfo } from './prismic.js';

async function testPrismicConnection() {
  console.log('Testing Prismic connection...');
  
  try {
    // Test press releases
    console.log('Fetching press releases...');
    const releases = await getPressReleases({ limit: 2 });
    console.log(`✅ Found ${releases.length} press releases`);
    
    if (releases.length > 0) {
      console.log('Sample release:', {
        title: releases[0].title,
        date: releases[0].date,
        slug: releases[0].slug
      });
    }
    
    // Test company info
    console.log('Fetching company info...');
    const companyInfo = await getCompanyInfo();
    console.log('✅ Company info loaded:', {
      name: companyInfo.basic?.name,
      founded: companyInfo.basic?.founded,
      mission: companyInfo.mission?.substring(0, 50) + '...'
    });
    
    console.log('🎉 Prismic integration test successful!');
    
  } catch (error) {
    console.error('❌ Prismic test failed:', error.message);
    console.log('This is expected if you haven\'t set up your Prismic repository yet.');
    console.log('Follow the instructions in PRISMIC_SETUP.md to complete the setup.');
  }
}

// Only run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testPrismicConnection();
}

export { testPrismicConnection };