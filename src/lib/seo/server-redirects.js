/**
 * Server-side redirect utilities for SSG build
 * Generates redirect pages for hash-based URLs
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';

// Mapping of hash-based routes to canonical paths
const HASH_REDIRECTS = {
  'home': '/',
  'product': '/product',
  'press': '/press',
  'about': '/about'
};

/**
 * Generate HTML redirect page
 * @param {string} targetUrl - The target canonical URL
 * @param {string} pageName - Name of the page for title
 * @returns {string} HTML redirect page content
 */
function generateRedirectHTML(targetUrl, pageName = 'Page') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirecting to ${pageName} | Alelken</title>
    
    <!-- Immediate redirect for crawlbots -->
    <meta http-equiv="refresh" content="0; url=${targetUrl}">
    <link rel="canonical" href="${targetUrl}">
    
    <!-- Additional SEO meta tags -->
    <meta name="robots" content="noindex, follow">
    <meta name="description" content="This page has moved to ${targetUrl}">
    
    <!-- Open Graph -->
    <meta property="og:url" content="${targetUrl}">
    <meta property="og:type" content="website">
    
    <!-- Twitter -->
    <meta name="twitter:url" content="${targetUrl}">
    
    <!-- Structured data for redirect -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "${targetUrl}",
        "mainEntity": {
            "@type": "WebPage",
            "url": "${targetUrl}"
        }
    }
    </script>
    
    <!-- JavaScript redirect as fallback -->
    <script>
        // Immediate redirect
        window.location.replace('${targetUrl}');
    </script>
</head>
<body>
    <!-- Fallback content for users with JavaScript disabled -->
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #0a0a0a; color: #ffffff; min-height: 100vh;">
        <h1>Page Moved</h1>
        <p>This page has moved to a new location.</p>
        <p><a href="${targetUrl}" style="color: #00ff88; text-decoration: none;">Click here to continue to ${pageName}</a></p>
        <p><small>You will be redirected automatically in a moment...</small></p>
    </div>
</body>
</html>`;
}

/**
 * Generate redirect pages for hash-based URLs
 * @param {string} distDir - Distribution directory path
 * @param {Array} dynamicRoutes - Array of dynamic routes (e.g., press releases)
 */
export function generateHashRedirectPages(distDir, dynamicRoutes = []) {
    console.log('🔄 Generating hash-based redirect pages...');
    
    const baseUrl = 'https://alelken.in';
    
    // Create redirect pages for each hash route
    Object.entries(HASH_REDIRECTS).forEach(([hash, path]) => {
        const targetUrl = `${baseUrl}${path}`;
        const pageName = hash.charAt(0).toUpperCase() + hash.slice(1);
        
        // Create directory structure for hash-based URL
        // e.g., /#product -> /hash/product/index.html
        const hashDir = join(distDir, 'hash', hash);
        if (!existsSync(hashDir)) {
            mkdirSync(hashDir, { recursive: true });
        }
        
        // Generate redirect HTML
        const redirectHTML = generateRedirectHTML(targetUrl, pageName);
        const redirectPath = join(hashDir, 'index.html');
        
        writeFileSync(redirectPath, redirectHTML);
        console.log(`  ✅ Created redirect: /hash/${hash}/ -> ${path}`);
    });
    
    // Create redirect pages for dynamic routes (press releases)
    dynamicRoutes.forEach(route => {
        if (route.path.startsWith('/press/')) {
            const uid = route.path.replace('/press/', '');
            const targetUrl = `${baseUrl}${route.path}`;
            const pageName = route.params?.title || 'Press Release';
            
            // Create directory structure for hash-based press URL
            // e.g., /#press/article-slug -> /hash/press/article-slug/index.html
            const hashPressDir = join(distDir, 'hash', 'press', uid);
            if (!existsSync(hashPressDir)) {
                mkdirSync(hashPressDir, { recursive: true });
            }
            
            // Generate redirect HTML
            const redirectHTML = generateRedirectHTML(targetUrl, pageName);
            const redirectPath = join(hashPressDir, 'index.html');
            
            writeFileSync(redirectPath, redirectHTML);
            console.log(`  ✅ Created redirect: /hash/press/${uid}/ -> ${route.path}`);
        }
    });
    
    // Create a general hash redirect handler
    const generalHashDir = join(distDir, 'hash');
    if (!existsSync(generalHashDir)) {
        mkdirSync(generalHashDir, { recursive: true });
    }
    
    const generalRedirectHTML = generateRedirectHTML(`${baseUrl}/`, 'Home');
    writeFileSync(join(generalHashDir, 'index.html'), generalRedirectHTML);
    console.log('  ✅ Created general hash redirect: /hash/ -> /');
}

/**
 * Generate .htaccess file for Apache servers
 * @param {string} distDir - Distribution directory path
 */
export function generateHtaccess(distDir) {
    const htaccessContent = `# Redirect hash-based URLs to canonical URLs
RewriteEngine On

# Redirect hash-based URLs (when accessed directly)
RewriteRule ^hash/home/?$ / [R=301,L]
RewriteRule ^hash/product/?$ /product [R=301,L]
RewriteRule ^hash/press/?$ /press [R=301,L]
RewriteRule ^hash/about/?$ /about [R=301,L]

# Handle SPA routing - redirect all non-file requests to index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache control
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>`;

    writeFileSync(join(distDir, '.htaccess'), htaccessContent);
    console.log('✅ Generated .htaccess file');
}

/**
 * Update Netlify redirects file
 * @param {string} distDir - Distribution directory path
 * @param {Array} dynamicRoutes - Array of dynamic routes
 */
export function updateNetlifyRedirects(distDir, dynamicRoutes = []) {
    let redirectsContent = `# Hash-based URL redirects for crawlbots
/hash/home     /           301
/hash/product  /product    301
/hash/press    /press      301
/hash/about    /about      301`;

    // Add dynamic press redirects
    dynamicRoutes.forEach(route => {
        if (route.path.startsWith('/press/')) {
            const uid = route.path.replace('/press/', '');
            redirectsContent += `\n/hash/press/${uid}  ${route.path}  301`;
        }
    });

    redirectsContent += `\n/hash/*        /           301

# SPA fallback for client-side routing
/*    /index.html   200`;

    writeFileSync(join(distDir, '_redirects'), redirectsContent);
    console.log('✅ Updated _redirects file');
}   