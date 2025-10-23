/**
 * Dynamic Server-side rendering for Svelte components
 * Reads actual component files and renders them with real data
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

/**
 * Extract component data from Svelte files
 */
function extractComponentData(componentPath) {
  try {
    const content = readFileSync(componentPath, 'utf-8');

    // Extract template section (everything outside script and style)
    let template = content
      .replace(/<script[^>]*>[\s\S]*?<\/script>/g, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/g, '')
      .trim();

    return { template };
  } catch (error) {
    console.warn(`Could not read component ${componentPath}:`, error.message);
    return null;
  }
}

/**
 * Process template with data - simple variable replacement
 */
function processTemplate(template, data = {}) {
  let processed = template;

  // Replace simple variable interpolations {variable}
  processed = processed.replace(/\{([^}#/]+)\}/g, (_, expression) => {
    try {
      const varName = expression.trim();
      if (data[varName] !== undefined) {
        return String(data[varName]);
      }
      return `{${expression}}`;
    } catch (error) {
      return `{${expression}}`;
    }
  });

  // Process #each blocks for arrays
  processed = processed.replace(/\{#each\s+(\w+)\s+as\s+(\w+)\}([\s\S]*?)\{\/each\}/g, (_, arrayName, itemName, content) => {
    try {
      if (data[arrayName] && Array.isArray(data[arrayName])) {
        return data[arrayName].map(item => {
          const itemData = { ...data, [itemName]: item };
          return processTemplate(content, itemData);
        }).join('');
      }
      return '';
    } catch (error) {
      return '';
    }
  });

  // Process #if blocks
  processed = processed.replace(/\{#if\s+([^}]+)\}([\s\S]*?)\{\/if\}/g, (_, condition, content) => {
    try {
      const conditionValue = data[condition.trim()];
      return conditionValue ? content : '';
    } catch (error) {
      return content;
    }
  });

  return processed;
}

/**
 * Render page content dynamically based on actual Svelte components
 */
export async function renderPageContent(route, pressReleases = []) {
  // For now, use enhanced fallback content that includes proper structure
  return getEnhancedFallbackContent(route, pressReleases);
}

/**
 * Get component name from route page
 */
function getComponentName(page) {
  const componentMap = {
    'home': 'Home',
    'product': 'Product',
    'press': 'Press',
    'press-detail': 'PressDetail',
    'about': 'About',
    'not-found': 'NotFound'
  };

  return componentMap[page] || 'NotFound';
}

/**
 * Get data for component based on route
 */
function getComponentData(route, pressReleases = []) {
  const baseData = {
    currentPage: route.page,
    routeParams: route.params || {}
  };

  switch (route.page) {
    case 'press':
      return {
        ...baseData,
        pressReleases: pressReleases.map(release => ({
          ...release,
          formattedDate: new Date(release.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        }))
      };

    case 'press-detail':
      const pressRelease = pressReleases.find(p => p.uid === route.params?.uid);
      return {
        ...baseData,
        uid: route.params?.uid,
        pressRelease: pressRelease ? {
          ...pressRelease,
          formattedDate: new Date(pressRelease.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        } : null
      };

    default:
      return baseData;
  }
}

/**
 * Render the complete page layout with header and footer
 */
export async function renderCompleteLayout(content, route) {
  // Try to read header component
  const headerPath = join(rootDir, 'src/components/layout/Header.svelte');
  const headerData = extractComponentData(headerPath);

  let headerHtml = '';

  if (headerData) {
    const headerComponentData = {
      currentPage: route.page,
      logoSrc: '/assets/logo/5.png'
    };
    headerHtml = processTemplate(headerData.template, headerComponentData);
  }

  // Fallback header if component can't be read
  if (!headerHtml) {
    headerHtml = `
      <header class="header">
        <div class="container">
          <nav class="nav">
            <a href="/" class="nav__logo">
              <img src="/assets/logo/5.png" alt="Alelken" width="32" height="32">
              Alelken
            </a>
            <ul class="nav__menu">
              <li><a href="/" class="${route.page === 'home' ? 'nav__link nav__link--active' : 'nav__link'}">Home</a></li>
              <li><a href="/product" class="${route.page === 'product' ? 'nav__link nav__link--active' : 'nav__link'}">Product</a></li>
              <li><a href="/press" class="${route.page === 'press' || route.page === 'press-detail' ? 'nav__link nav__link--active' : 'nav__link'}">Press</a></li>
              <li><a href="/about" class="${route.page === 'about' ? 'nav__link nav__link--active' : 'nav__link'}">About</a></li>
            </ul>
          </nav>
        </div>
      </header>
    `;
  }

  const footerHtml = `
    <footer class="footer">
      <div class="container">
        <div class="footer__content">
          <div class="footer__brand">
            <h3>Alelken</h3>
            <p>Technology for Human Potential</p>
          </div>
        </div>
        <div class="footer__bottom">
          <p>&copy; ${new Date().getFullYear()} Alelken. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;

  return `
    <div class="app">
      ${headerHtml}
      ${content}
      ${footerHtml}
    </div>
  `;
}

/**
 * Enhanced fallback content with proper structure and styling
 */
function getEnhancedFallbackContent(route, pressReleases = []) {
  switch (route.page) {
    case 'home':
      return `
        <main class="page page--home">
          <section class="hero">
            <div class="hero__container">
              <div class="hero__content">
                <h1 class="hero__title">
                  <span class="hero__title-accent">TECHNOLOGY</span>
                  <span class="hero__title-main">FOR HUMAN POTENTIAL</span>
                </h1>
                <p class="hero__subtitle">
                  Building systems that heal, educate, and sustain through innovative solutions
                </p>
              </div>
            </div>
          </section>
          
          <section class="vision">
            <div class="vision__container">
              <div class="vision__content">
                <p class="vision__text">
                  Most systems we interact with daily weren't designed with actual human needs in mind. 
                  They were designed for efficiency, for scale, for control.
                </p>
                <p class="vision__text">
                  We believe <span class="vision__accent">technology's highest purpose</span> 
                  is fixing what's broken at the root, not automating dysfunction.
                </p>
              </div>
            </div>
          </section>
        </main>
      `;

    case 'product':
      return `
        <main class="page page--product">
          <section class="product-hero section">
            <div class="container">
              <h1>Alayn: Mental Wellness for India</h1>
              <p>A culturally-aware mental wellness platform designed specifically for India's diverse population and unique mental health challenges.</p>
              
              <div class="product-features">
                <div class="feature">
                  <h3>Culturally Aware</h3>
                  <p>Built with deep understanding of Indian cultural contexts, family dynamics, and social structures.</p>
                </div>
                <div class="feature">
                  <h3>Accessible</h3>
                  <p>Designed to work across different languages, economic backgrounds, and technological literacy levels.</p>
                </div>
                <div class="feature">
                  <h3>Evidence-Based</h3>
                  <p>Grounded in proven therapeutic approaches adapted for Indian contexts and needs.</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      `;

    case 'press':
      const pressItems = pressReleases.map(release => `
        <article class="press-item">
          <h3 class="press-item__title">
            <a href="/press/${release.uid}" class="press-item__link">${release.title}</a>
          </h3>
          <time class="press-item__date" datetime="${release.date}">
            ${new Date(release.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </time>
          <p class="press-item__excerpt">${release.excerpt}</p>
        </article>
      `).join('');
      
      return `
        <main class="page page--press">
          <section class="press-hero section">
            <div class="container">
              <h1>Press Releases</h1>
              <p>Latest news and announcements from Alelken.</p>
            </div>
          </section>
          <section class="press-list section">
            <div class="container">
              ${pressItems || '<p>No press releases available at this time.</p>'}
            </div>
          </section>
        </main>
      `;

    case 'press-detail':
      const pressRelease = pressReleases.find(p => p.uid === route.params?.uid);
      if (!pressRelease) {
        return `
          <main class="page page--press-detail">
            <section class="press-detail section">
              <div class="container">
                <h1>Press Release Not Found</h1>
                <p>The press release you're looking for doesn't exist or has been moved.</p>
                <a href="/press" class="button">← Back to Press Releases</a>
              </div>
            </section>
          </main>
        `;
      }
      
      return `
        <main class="page page--press-detail">
          <article class="press-article">
            <div class="container">
              <header class="press-article__header">
                <h1 class="press-article__title">${pressRelease.title}</h1>
                <time class="press-article__date" datetime="${pressRelease.date}">
                  ${new Date(pressRelease.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </time>
              </header>
              <div class="press-article__content">
                ${pressRelease.content || pressRelease.excerpt}
              </div>
              <footer class="press-article__footer">
                <a href="/press" class="button">← Back to Press Releases</a>
              </footer>
            </div>
          </article>
        </main>
      `;

    case 'about':
      return `
        <main class="page page--about">
          <section class="about-hero section">
            <div class="container">
              <h1>About Alelken</h1>
              <p>Meet the team behind Alelken and learn about our mission to build technology for human potential.</p>
            </div>
          </section>
          
          <section class="about-mission section">
            <div class="container">
              <h2>Our Mission</h2>
              <p>
                We exist to prove that profit and purpose don't have to conflict. 
                That technology companies can build for impact without burning resources. 
                That the problems everyone says are 'too complex' can be solved with clear thinking and genuine care.
              </p>
            </div>
          </section>
          
          <section class="about-approach section">
            <div class="container">
              <h2>Our Approach</h2>
              <div class="approach-principles">
                <div class="principle">
                  <h3>First Principles Over Features</h3>
                  <p>We start by asking what people actually need, not what competitors are building.</p>
                </div>
                <div class="principle">
                  <h3>Built for the Underserved</h3>
                  <p>The real measure of impact isn't who can afford premium services.</p>
                </div>
                <div class="principle">
                  <h3>Sustainable by Design</h3>
                  <p>Solutions that require constant fundraising aren't solutions.</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      `;

    default:
      return `
        <main class="page page--not-found">
          <section class="not-found section">
            <div class="container">
              <h1>404 - Page Not Found</h1>
              <p>The page you're looking for doesn't exist. Explore our technology solutions for human potential.</p>
              <a href="/" class="button">← Go Home</a>
            </div>
          </section>
        </main>
      `;
  }
}