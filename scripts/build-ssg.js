#!/usr/bin/env node

import { build } from 'vite';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import { generateHashRedirectPages, generateHtaccess, updateNetlifyRedirects } from '../src/lib/seo/server-redirects.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');

// Load environment variables (local .env file if it exists)
const envPath = join(rootDir, '.env');
if (existsSync(envPath)) {
    config({ path: envPath });
}

// Also try loading from current directory
config();

// Environment variables are already available in CI/CD environments like Vercel
console.log('🔧 Environment check:');
console.log(`   VITE_PRISMIC_ENDPOINT: ${process.env.VITE_PRISMIC_ENDPOINT ? '✅ Set' : '❌ Missing'}`);
console.log(`   VITE_PRISMIC_ACCESS_TOKEN: ${process.env.VITE_PRISMIC_ACCESS_TOKEN ? '✅ Set' : '❌ Missing'}`);

// Routes to pre-render
const routes = [
    { path: '/', page: 'home' },
    { path: '/product', page: 'product' },
    { path: '/press', page: 'press' },
    { path: '/about', page: 'about' },
    { path: '/404', page: 'not-found' }
];

// Dynamic routes (press releases)
async function getDynamicRoutes() {
    try {
        console.log('📡 Fetching content for SSG...');

        let pressReleases = [];

        try {
            // Try to get content from Prismic using build-time client
            const prismicBuildPath = `file://${join(rootDir, 'scripts/prismic-build.js').replace(/\\/g, '/')}`;
            const { getBuildTimePressReleases } = await import(prismicBuildPath);
            pressReleases = await getBuildTimePressReleases();
            console.log(`✅ Fetched ${pressReleases.length} press releases from Prismic`);
        } catch (prismicError) {
            console.error('❌ Prismic error details:', prismicError);
            console.warn('⚠️  Could not fetch from Prismic, falling back to local content:', prismicError.message);

            // Fallback to local content
            const contentPath = `file://${join(rootDir, 'src/lib/cms/content.js').replace(/\\/g, '/')}`;
            const { getPressReleases: getLocalPressReleases } = await import(contentPath);
            pressReleases = getLocalPressReleases();
            console.log(`✅ Using ${pressReleases.length} press releases from local content`);
        }

        return pressReleases.map(release => ({
            path: `/press/${release.slug || release.uid}`,
            page: 'press-detail',
            params: {
                uid: release.slug || release.uid,
                title: release.title,
                excerpt: release.excerpt
            }
        }));
    } catch (error) {
        console.warn('❌ Could not load dynamic routes:', error.message);
        return [];
    }
}

// Generate HTML for a specific route
function generateHTML(templateHTML, route) {
    // Replace the hash-based routing with proper paths
    let html = templateHTML;
    
    // Generate cache-busting timestamp (rounded to nearest minute)
    const now = new Date();
    const cacheTimestamp = Math.floor(now.getTime() / (60 * 1000)) * (60 * 1000);
    const cacheParam = `?v=${cacheTimestamp}`;
    
    // Add cache-busting parameters to all asset URLs
    html = html.replace(/src="\/assets\/([^"]+)"/g, `src="/assets/$1${cacheParam}"`);
    html = html.replace(/href="\/assets\/([^"]+)"/g, `href="/assets/$1${cacheParam}"`);

    // Set the initial page state
    const pageData = {
        currentPage: route.page,
        routeParams: route.params || {}
    };

    // Inject initial state and crawlbot redirect logic
    const crawlbotScript = route.path === '/' ? `
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(pageData)};
      
      // Crawlbot redirect logic (only for root page)
      (function() {
        var userAgent = navigator.userAgent.toLowerCase();
        var crawlbots = ['googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider', 'yandexbot', 'facebookexternalhit', 'twitterbot', 'linkedinbot', 'whatsapp', 'telegrambot', 'applebot', 'crawler', 'spider', 'bot'];
        var isCrawlbot = crawlbots.some(function(bot) { return userAgent.includes(bot); });
        
        if (isCrawlbot && window.location.hash) {
          var hash = window.location.hash;
          var redirectMap = {
            '#home': '/',
            '#product': '/product',
            '#press': '/press',
            '#about': '/about'
          };
          
          var canonicalPath = redirectMap[hash];
          if (canonicalPath && canonicalPath !== '/') {
            console.log('Crawlbot redirect:', hash, '->', canonicalPath);
            setTimeout(function() {
              window.location.replace('https://alelken.in' + canonicalPath);
            }, 1000);
          }
          
          // Handle press detail redirects
          if (hash.startsWith('#press/')) {
            var uid = hash.replace('#press/', '');
            var pressPath = '/press/' + uid;
            console.log('Crawlbot redirect:', hash, '->', pressPath);
            setTimeout(function() {
              window.location.replace('https://alelken.in' + pressPath);
            }, 1000);
          }
        }
      })();
    </script>` : `<script>
      window.__INITIAL_STATE__ = ${JSON.stringify(pageData)};
    </script>`;

    html = html.replace(
        '<script type="module" crossorigin src="/assets/index-',
        crawlbotScript + '\n    <script type="module" crossorigin src="/assets/index-'
    );

    // Update meta tags based on route
    const metaTags = getMetaTags(route);
    html = html.replace(
        '<title>Alelken</title>',
        `<title>${metaTags.title}</title>`
    );

    html = html.replace(
        '<meta name="description" content="Building systems that heal, educate, and sustain through innovative technology solutions." />',
        `<meta name="description" content="${metaTags.description}" />`
    );

    // Update Open Graph tags
    html = html.replace(
        '<meta property="og:title" content="Alelken - Technology for Human Potential" />',
        `<meta property="og:title" content="${metaTags.title}" />`
    );

    html = html.replace(
        '<meta property="og:description" content="Building systems that heal, educate, and sustain through innovative technology solutions." />',
        `<meta property="og:description" content="${metaTags.description}" />`
    );

    html = html.replace(
        '<meta property="og:url" content="https://alelken.in/" />',
        `<meta property="og:url" content="https://alelken.in${route.path}" />`
    );

    // Update Twitter tags
    html = html.replace(
        '<meta name="twitter:title" content="Alelken - Technology for Human Potential" />',
        `<meta name="twitter:title" content="${metaTags.title}" />`
    );

    html = html.replace(
        '<meta name="twitter:description" content="Building systems that heal, educate, and sustain through innovative technology solutions." />',
        `<meta name="twitter:description" content="${metaTags.description}" />`
    );

    html = html.replace(
        '<meta name="twitter:url" content="https://alelken.in/" />',
        `<meta name="twitter:url" content="https://alelken.in${route.path}" />`
    );

    // Add canonical URL
    html = html.replace(
        '</head>',
        `  <link rel="canonical" href="https://alelken.in${route.path}">
</head>`
    );

    return html;
}

// Get meta tags for a route
function getMetaTags(route) {
    const metadata = {
        home: {
            title: 'Home | Alelken',
            description: 'Building systems that heal, educate, and sustain through innovative technology solutions.'
        },
        product: {
            title: 'Product | Alelken',
            description: 'Discover Alayn, our mental wellness platform designed specifically for India\'s unique cultural context.'
        },
        press: {
            title: 'Press | Alelken',
            description: 'Latest news and announcements from Alelken.'
        },
        about: {
            title: 'About | Alelken',
            description: 'Meet the team behind Alelken and learn about our mission to build technology for human potential.'
        },
        'press-detail': {
            title: route.params?.title ? `${route.params.title} | Alelken` : 'Press Release | Alelken',
            description: route.params?.excerpt || 'Read our latest press release.'
        },
        'not-found': {
            title: '404 - Page Not Found | Alelken',
            description: 'The page you\'re looking for doesn\'t exist. Explore our technology solutions for human potential.'
        }
    };

    return metadata[route.page] || metadata.home;
}

// Main build function
async function buildSSG() {
    console.log('🚀 Starting SSG build...');

    try {
        // Step 1: Build the SPA version first
        console.log('📦 Building SPA version...');
        await build({
            build: {
                outDir: 'dist'
            }
        });

        // Step 2: Read the generated index.html template
        const templatePath = join(distDir, 'index.html');
        if (!existsSync(templatePath)) {
            throw new Error('index.html not found in dist directory');
        }

        const templateHTML = readFileSync(templatePath, 'utf-8');

        // Step 3: Get all routes (static + dynamic)
        const dynamicRoutes = await getDynamicRoutes();
        const allRoutes = [...routes, ...dynamicRoutes];

        console.log(`📄 Generating ${allRoutes.length} static pages...`);

        // Step 4: Generate static HTML for each route
        for (const route of allRoutes) {
            const html = generateHTML(templateHTML, route);

            // Create directory structure
            const routePath = route.path === '/' ? '/index.html' : `${route.path}/index.html`;
            const filePath = join(distDir, routePath);
            const fileDir = dirname(filePath);

            if (!existsSync(fileDir)) {
                mkdirSync(fileDir, { recursive: true });
            }

            // Write the HTML file
            writeFileSync(filePath, html);
            console.log(`  ✅ Generated: ${route.path}`);
        }

        // Step 5: Generate sitemap.xml
        console.log('🗺️  Generating sitemap...');
        generateSitemap(allRoutes);

        // Step 6: Create 404.html for hosting providers
        const notFoundRoute = allRoutes.find(route => route.page === 'not-found');
        if (notFoundRoute) {
            const notFoundHtml = generateHTML(templateHTML, notFoundRoute);
            writeFileSync(join(distDir, '404.html'), notFoundHtml);
            console.log('  ✅ Generated: /404.html');
        }

        // Step 7: Generate hash-based redirect pages for crawlbots
        generateHashRedirectPages(distDir, dynamicRoutes);

        // Step 8: Generate server configuration files
        generateHtaccess(distDir);
        updateNetlifyRedirects(distDir, dynamicRoutes);

        // Step 9: Copy robots.txt if it doesn't exist
        const robotsPath = join(distDir, 'robots.txt');
        if (!existsSync(robotsPath)) {
            const robotsContent = `User-agent: *
Allow: /

Sitemap: https://alelken.in/sitemap.xml`;
            writeFileSync(robotsPath, robotsContent);
        }

        console.log('✨ SSG build completed successfully!');
        console.log(`📊 Generated ${allRoutes.length} static pages`);
        console.log('🔄 Generated hash-based redirect pages for crawlbots');

    } catch (error) {
        console.error('❌ SSG build failed:', error);
        process.exit(1);
    }
}

// Generate sitemap.xml
function generateSitemap(routes) {
    const baseUrl = 'https://alelken.in';
    const currentDate = new Date().toISOString().split('T')[0];

    // Filter out 404 page from sitemap
    const sitemapRoutes = routes.filter(route => route.page !== 'not-found');

    const urls = sitemapRoutes.map(route => {
        const priority = route.path === '/' ? '1.0' : '0.8';
        const changefreq = route.page === 'press-detail' ? 'monthly' : 'weekly';

        return `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    }).join('\n');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    writeFileSync(join(distDir, 'sitemap.xml'), sitemap);
}

// Run the build
buildSSG();