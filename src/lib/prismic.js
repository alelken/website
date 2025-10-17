import { createClient } from '@prismicio/client';
import * as prismic from '@prismicio/client';
import { asHTML } from '@prismicio/helpers';
import { contentToHtml } from './markdown.js';

/**
 * Convert content to HTML string
 * Handles Prismic rich text objects, markdown, and plain strings
 * @param {any} content - Content to convert
 * @returns {string} HTML string
 */
function contentToHTMLWithMarkdown(content) {
  if (!content) return '';
  
  // If it's already a string, process it through markdown converter
  if (typeof content === 'string') {
    return contentToHtml(content);
  }
  
  // If it's a Prismic rich text object, convert to HTML
  try {
    // Check if it's a valid Prismic rich text structure
    if (Array.isArray(content) || (content && typeof content === 'object')) {
      return asHTML(content);
    }
    return String(content);
  } catch (error) {
    console.warn('Error converting content to HTML:', error, content);
    return '';
  }
}

// Prismic repository configuration
const endpoint = import.meta.env.VITE_PRISMIC_ENDPOINT;
const accessToken = import.meta.env.VITE_PRISMIC_ACCESS_TOKEN;

if (!endpoint) {
  throw new Error('VITE_PRISMIC_ENDPOINT environment variable is required');
}

// Create Prismic client
export const client = createClient(endpoint, {
  accessToken,
  // Enable preview mode for content editors
  routes: [
    {
      type: 'press_release',
      path: '/press/:uid',
    },
  ],
});

/**
 * Get all press releases from Prismic
 * @param {Object} options - Query options
 * @returns {Promise<Array>} Array of press releases
 */
export async function getPressReleases(options = {}) {
  try {
    const response = await client.getAllByType('press_release', {
      orderings: [
        { field: 'my.press_release.date', direction: 'desc' }
      ],
      ...(options.featured && { 
        filters: [prismic.filter.at('my.press_release.featured', true)] 
      }),
      ...(options.limit && { pageSize: options.limit })
    });
    
    return response.map(doc => ({
      id: doc.id,
      uid: doc.uid,
      slug: doc.uid, // Use UID as slug
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
    console.error('Error fetching press releases from Prismic:', error);
    // Fallback to local content if Prismic fails
    const { getPressReleases: getLocalPressReleases } = await import('./cms/content.js');
    return getLocalPressReleases(options);
  }
}

/**
 * Get a single press release by UID
 * @param {string} uid - Press release UID
 * @returns {Promise<Object|null>} Press release object or null
 */
export async function getPressReleaseByUid(uid) {
  try {
    const response = await client.getByUID('press_release', uid);
    
    return {
      id: response.id,
      uid: response.uid,
      slug: response.uid,
      title: response.data.title,
      date: response.data.date,
      excerpt: response.data.excerpt || '',
      content: contentToHTMLWithMarkdown(response.data.content),
      author: response.data.author,
      featuredImage: response.data.featured_image,
      tags: response.tags || [],
      featured: response.data.featured || false,
      lastModified: response.last_publication_date
    };
  } catch (error) {
    console.error('Error fetching press release from Prismic:', error);
    // Fallback to local content if Prismic fails
    const { getPressReleaseBySlug } = await import('./cms/content.js');
    return getPressReleaseBySlug(uid);
  }
}

/**
 * Get media assets from Prismic
 * @param {string} category - Asset category filter
 * @returns {Promise<Array>} Array of media assets
 */
export async function getMediaAssets(category = null) {
  try {
    const filters = [];
    if (category) {
      filters.push(prismic.filter.at('my.media_asset.category', category));
    }
    
    const response = await client.getAllByType('media_asset', {
      ...(filters.length > 0 && { filters }),
      orderings: [
        { field: 'my.media_asset.name', direction: 'asc' }
      ]
    });
    
    return response.map(doc => ({
      id: doc.id,
      name: doc.data.name,
      description: doc.data.description,
      downloadUrl: doc.data.file?.url || '#',
      fileSize: doc.data.file_size || 'Unknown',
      dimensions: doc.data.dimensions || 'Unknown',
      format: doc.data.format || 'Unknown',
      category: doc.data.category || 'general'
    }));
  } catch (error) {
    console.error('Error fetching media assets from Prismic:', error);
    // Fallback to local content if Prismic fails
    const { getMediaAssets: getLocalMediaAssets } = await import('./cms/content.js');
    return getLocalMediaAssets(category);
  }
}

/**
 * Get company information from Prismic
 * @returns {Promise<Object>} Company information
 */
export async function getCompanyInfo() {
  try {
    const response = await client.getSingle('company_info');
    
    return {
      basic: {
        name: response.data.company_name,
        founded: response.data.founded,
        headquarters: response.data.headquarters,
        website: response.data.website?.url || 'https://alelken.in',
        employees: response.data.employees,
        stage: response.data.stage
      },
      mission: response.data.mission,
      vision: response.data.vision,
      focus: response.data.focus,
      sectors: response.data.sectors || [],
      values: response.data.values || [],
      products: response.data.products || []
    };
  } catch (error) {
    console.error('Error fetching company info from Prismic:', error);
    // Fallback to local content if Prismic fails
    const { getCompanyInfo: getLocalCompanyInfo } = await import('./cms/content.js');
    return getLocalCompanyInfo();
  }
}

/**
 * Get media contact information from Prismic
 * @returns {Promise<Object>} Media contact information
 */
export async function getMediaContacts() {
  try {
    const response = await client.getSingle('media_contacts');
    
    return {
      primary: {
        title: response.data.primary_title,
        email: response.data.primary_email,
        responseTime: response.data.response_time,
        description: response.data.primary_description
      },
      leadership: response.data.leadership_contacts || []
    };
  } catch (error) {
    console.error('Error fetching media contacts from Prismic:', error);
    // Fallback to local content if Prismic fails
    const { getMediaContacts: getLocalMediaContacts } = await import('./cms/content.js');
    return getLocalMediaContacts();
  }
}

// Test the content conversion function
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  // Test with sample Prismic rich text structure
  const testRichText = [
    {
      type: 'paragraph',
      text: 'This is a test paragraph.',
      spans: []
    }
  ];
  
  console.log('Content conversion test:', contentToHTMLWithMarkdown(testRichText));
  console.log('String content test:', contentToHTMLWithMarkdown('This is a plain string'));
  console.log('Null content test:', contentToHTMLWithMarkdown(null));
}

// Preview mode helpers
export function exitPreview() {
  return client.resolvePreviewURL({
    linkResolver: (doc) => {
      if (doc.type === 'press_release') {
        return `/press/${doc.uid}`;
      }
      return '/';
    },
    defaultURL: '/'
  });
}