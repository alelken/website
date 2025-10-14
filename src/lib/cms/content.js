// Content Management System
// This file provides a structured way to manage content that can be easily migrated to Prismic IO

/**
 * Press Release Content Structure
 * Each press release should have a unique URL when integrated with Prismic IO
 */
export const pressReleases = [
  {
    id: "alelken-announces-alayn-development-2024-10",
    slug: "alelken-announces-alayn-development",
    title: "Alelken Announces Development of Alayn: India's First Culturally-Aware Mental Wellness Platform",
    date: "2024-10-01",
    excerpt: "Startup focuses on building technology solutions that address India's unique mental health challenges with cultural sensitivity and local context.",
    author: "Alelken PR Team",
    featuredImage: null,
    content: `
      <p>Alelken, a technology startup focused on human potential amplification, today announced the development of Alayn, India's first culturally-aware mental wellness platform designed specifically for the Indian context.</p>
      
      <p>The platform addresses the unique challenges faced by Indians in accessing mental health support, including cultural stigma, language barriers, and the need for culturally sensitive approaches to wellness.</p>
      
      <p>"We're not just digitizing Western mental health models," said G Harikrishna, CEO of Alelken. "We're building something that understands the Indian context, respects our cultural values, and provides support in ways that feel natural and accessible to our people."</p>
      
      <p>Alayn is currently in development and is expected to launch in early 2025. The platform will offer multi-language support, connectivity optimization for various network conditions, and strict privacy compliance with Indian regulations.</p>
    `,
    tags: ["product-launch", "mental-health", "india", "technology"],
    featured: true
  },
  {
    id: "alelken-secures-initial-funding-2024-08",
    slug: "alelken-secures-initial-funding",
    title: "Alelken Secures Initial Funding to Develop Human-Centered Technology Solutions",
    date: "2024-08-15",
    excerpt: "Company aims to create technology that amplifies human potential across wellness, education, and sustainability sectors.",
    author: "Alelken PR Team",
    featuredImage: null,
    content: `
      <p>Alelken has successfully secured initial funding to advance its mission of building technology solutions that amplify human potential across three key areas: inner wellness, education evolution, and planetary stewardship.</p>
      
      <p>The funding will support the development of the company's flagship product, Alayn, as well as research into culturally-aware technology solutions that address real human needs.</p>
      
      <p>"This funding validates our approach of putting human needs first and building technology that serves people, not the other way around," said Karthick Balraj, COO of Alelken.</p>
      
      <p>The company plans to use the funding to expand its team, accelerate product development, and conduct extensive user research to ensure their solutions truly meet the needs of their target communities.</p>
    `,
    tags: ["funding", "company-news", "technology"],
    featured: false
  }
];

/**
 * Media Assets Structure
 * Organized for easy management and future CMS integration
 */
export const mediaAssets = {
  logos: [
    {
      id: "logo-png-high-res",
      name: "Company Logo (PNG)",
      description: "High-resolution transparent logo suitable for print and digital use",
      downloadUrl: "/assets/press/logos/alelken-logo-high-res.png",
      fileSize: "2.1 MB",
      dimensions: "2000x800px",
      format: "PNG",
      category: "logos"
    },
    {
      id: "logo-svg-vector",
      name: "Company Logo (SVG)",
      description: "Vector format logo for scalable use",
      downloadUrl: "/assets/press/logos/alelken-logo.svg",
      fileSize: "45 KB",
      dimensions: "Vector",
      format: "SVG",
      category: "logos"
    }
  ],
  photos: [
    {
      id: "founder-photos-pack",
      name: "Founder Photos",
      description: "Professional headshots of leadership team in various formats",
      downloadUrl: "/assets/press/photos/founder-photos.zip",
      fileSize: "8.3 MB",
      dimensions: "Various",
      format: "ZIP (JPG)",
      category: "photos"
    }
  ],
  brandMaterials: [
    {
      id: "brand-guidelines-pdf",
      name: "Brand Guidelines",
      description: "Complete brand identity guidelines including colors, typography, and usage rules",
      downloadUrl: "/assets/press/brand/brand-guidelines.pdf",
      fileSize: "1.8 MB",
      dimensions: "PDF Document",
      format: "PDF",
      category: "brand"
    }
  ]
};

/**
 * Company Information
 * Centralized company facts and information
 */
export const companyInfo = {
  basic: {
    name: "Alelken",
    founded: "2024",
    headquarters: "India",
    website: "https://alelken.com",
    employees: "3-10",
    stage: "Early Stage Startup"
  },
  mission: "Building technology that amplifies human potential through culturally-aware solutions",
  vision: "A world where technology serves humanity's highest potential",
  focus: "Mental Wellness Technology",
  sectors: ["Mental Health", "EdTech", "Sustainability"],
  values: [
    "First Principles Thinking",
    "Cultural Intelligence", 
    "Sustainable Business Models",
    "Transparency"
  ],
  products: [
    {
      name: "Alayn",
      description: "India's culturally-aware mental wellness platform",
      status: "In Development",
      launchDate: "Early 2025"
    }
  ]
};

/**
 * Media Contact Information
 */
export const mediaContacts = {
  primary: {
    title: "Press Inquiries",
    email: "press@alelken.com",
    responseTime: "Within 24 hours",
    description: "For press inquiries, interview requests, or additional information"
  },
  leadership: [
    {
      name: "G Harikrishna",
      role: "CEO & Co-founder",
      email: "harikrishna@alelken.com",
      linkedin: "https://linkedin.com/in/g-harikrishna",
      availableFor: ["Strategic interviews", "Product vision discussions", "Company direction"]
    },
    {
      name: "Karthick Balraj", 
      role: "COO & Co-founder",
      email: "karthick.balraj@alelken.com",
      linkedin: "https://linkedin.com/in/karthick-balraj",
      availableFor: ["Operations interviews", "Business model discussions", "Market strategy"]
    },
    {
      name: "Karthick Selvaraj",
      role: "Media Lead & Co-founder", 
      email: "karthick.selvaraj@alelken.com",
      linkedin: "https://linkedin.com/in/karthick-selvaraj",
      availableFor: ["Media coordination", "Content strategy", "Brand messaging"]
    }
  ]
};

/**
 * CMS Helper Functions
 * These functions provide an interface that can be easily replaced with Prismic IO API calls
 */

/**
 * Get all press releases, optionally filtered
 * @param {Object} options - Filter options
 * @returns {Array} Array of press releases
 */
export function getPressReleases(options = {}) {
  let releases = [...pressReleases];
  
  // Sort by date (newest first)
  releases.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Filter by featured if requested
  if (options.featured) {
    releases = releases.filter(release => release.featured);
  }
  
  // Filter by tag if requested
  if (options.tag) {
    releases = releases.filter(release => release.tags.includes(options.tag));
  }
  
  // Limit results if requested
  if (options.limit) {
    releases = releases.slice(0, options.limit);
  }
  
  return releases;
}

/**
 * Get a single press release by slug
 * @param {string} slug - Press release slug
 * @returns {Object|null} Press release object or null if not found
 */
export function getPressReleaseBySlug(slug) {
  return pressReleases.find(release => release.slug === slug) || null;
}

/**
 * Get all media assets, optionally filtered by category
 * @param {string} category - Asset category (logos, photos, brand)
 * @returns {Array} Array of media assets
 */
export function getMediaAssets(category = null) {
  if (!category) {
    return [
      ...mediaAssets.logos,
      ...mediaAssets.photos,
      ...mediaAssets.brandMaterials
    ];
  }
  
  switch (category) {
    case 'logos':
      return mediaAssets.logos;
    case 'photos':
      return mediaAssets.photos;
    case 'brand':
      return mediaAssets.brandMaterials;
    default:
      return [];
  }
}

/**
 * Get company information
 * @returns {Object} Company information object
 */
export function getCompanyInfo() {
  return companyInfo;
}

/**
 * Get media contact information
 * @returns {Object} Media contact information
 */
export function getMediaContacts() {
  return mediaContacts;
}

// Future Prismic IO integration notes:
// 1. Replace these functions with Prismic API calls
// 2. Each press release will have its own URL: /press/[slug]
// 3. Content will be managed through Prismic dashboard
// 4. Rich text content will use Prismic's RichText component
// 5. Media assets can be managed through Prismic's media library