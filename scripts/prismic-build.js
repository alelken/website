// Build-time Prismic client for SSG
import { createClient } from '@prismicio/client';
import { asHTML } from '@prismicio/helpers';
import { config } from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Load environment variables (local .env file if it exists)
const envPath = join(rootDir, '.env');
if (existsSync(envPath)) {
  config({ path: envPath });
}

const endpoint = process.env.VITE_PRISMIC_ENDPOINT;
const accessToken = process.env.VITE_PRISMIC_ACCESS_TOKEN;

if (!endpoint) {
  throw new Error('VITE_PRISMIC_ENDPOINT environment variable is required');
}

// Create Prismic client
const client = createClient(endpoint, {
  accessToken,
  routes: [
    {
      type: 'press_release',
      path: '/press/:uid',
    },
  ],
});

/**
 * Convert content to HTML string
 */
function contentToHTMLWithMarkdown(content) {
  if (!content) return '';
  
  if (typeof content === 'string') {
    return content;
  }
  
  try {
    if (Array.isArray(content) || (content && typeof content === 'object')) {
      return asHTML(content);
    }
    return String(content);
  } catch (error) {
    console.warn('Error converting content to HTML:', error);
    return '';
  }
}

/**
 * Get all press releases from Prismic for build time
 */
export async function getBuildTimePressReleases() {
  try {
    console.log('🔍 Fetching press releases from Prismic...');
    
    const response = await client.getAllByType('press_release', {
      orderings: [
        { field: 'my.press_release.date', direction: 'desc' }
      ]
    });
    
    console.log(`📄 Found ${response.length} press releases in Prismic`);
    
    return response.map(doc => ({
      id: doc.id,
      uid: doc.uid,
      slug: doc.uid,
      title: doc.data.title,
      date: doc.data.date,
      excerpt: doc.data.excerpt || '',
      content: contentToHTMLWithMarkdown(doc.data.content),
      author: doc.data.author,
      featuredImage: doc.data.featured_image,
      tags: doc.tags || [],
      featured: doc.data.featured || false,
      lastModified: doc.last_publication_date
    }));
  } catch (error) {
    console.error('❌ Error fetching press releases from Prismic:', error.message);
    throw error;
  }
}