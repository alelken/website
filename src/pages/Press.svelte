<script>
  import { onMount } from 'svelte';
  import Card from '../components/ui/Card.svelte';
  import Button from '../components/ui/Button.svelte';
  import { getPressReleases } from '../lib/prismic.js';
  import { navigateToPress } from '../lib/stores/router.js';
  
  // Reactive data stores
  let pressReleases = [];
  let loading = true;
  let error = null;
  
  // Helper function to format dates safely
  function formatDate(dateString) {
    if (!dateString) return 'Date not available';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.warn('Invalid date:', dateString);
        return 'Invalid date';
      }
      
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (error) {
      console.error('Error formatting date:', dateString, error);
      return 'Date formatting error';
    }
  }

  // Image loading handlers
  function handleImageLoad(e) {
    const target = e.target;
    const loadingEl = target.previousElementSibling;
    if (loadingEl) {
      loadingEl.style.display = 'none';
    }
    target.style.opacity = '1';
  }

  function handleImageError(e) {
    const target = e.target;
    console.warn('Image failed to load:', target.src);
    target.style.display = 'none';
    const loadingEl = target.previousElementSibling;
    if (loadingEl) {
      loadingEl.style.display = 'none';
    }
    const placeholder = target.nextElementSibling;
    if (placeholder) {
      placeholder.style.display = 'flex';
    }
  }

  // Load content from Prismic on component mount
  onMount(async () => {
    try {
      loading = true;
      
      // Load press releases
      pressReleases = await getPressReleases();
      console.log('Loaded press releases:', pressReleases);
      
      // Debug: Check if any content is showing as object
      pressReleases.forEach((release, index) => {
        if (typeof release.excerpt === 'object') {
          console.warn(`Press release ${index} excerpt is object:`, release.excerpt);
        }
        if (typeof release.content === 'object') {
          console.warn(`Press release ${index} content is object:`, release.content);
        }
        if (release.featuredImage) {
          console.log(`Press release ${index} has image:`, release.featuredImage);
        } else {
          console.log(`Press release ${index} has no image`);
        }
      });
      
    } catch (err) {
      console.error('Error loading press releases:', err);
      error = 'Failed to load content. Please try again later.';
    } finally {
      loading = false;
    }
  });
</script>

<div class="page page--press">
  <!-- Hero Section -->
  <section class="hero">
    <div class="hero__container">
      <h1 class="hero__title">Press Releases</h1>
      <p class="hero__subtitle">
        Latest news and announcements from Alelken
      </p>
    </div>
  </section>
  
  <!-- Loading State -->
  {#if loading}
    <section class="loading">
      <div class="loading__container">
        <div class="loading__spinner"></div>
        <p class="loading__text">Loading press releases...</p>
      </div>
    </section>
  {:else if error}
    <!-- Error State -->
    <section class="error">
      <div class="error__container">
        <h2 class="error__title">Content Unavailable</h2>
        <p class="error__message">{error}</p>
        <Button variant="primary" on:click={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    </section>
  {:else}
  
  <!-- Press Releases Section -->
  <section class="press-releases">
    <div class="press-releases__container">
      <div class="section__header">
        <h2 class="section__title">Press Releases</h2>
        <div class="section__accent-line"></div>
      </div>
      <div class="press-releases__grid">
        {#each pressReleases as release}
          <div 
            class="press-release-card" 
            on:click={() => navigateToPress(release.slug || release.uid)}
            on:keydown={(e) => e.key === 'Enter' && navigateToPress(release.slug || release.uid)}
            role="button"
            tabindex="0"
          >
            <Card variant="outlined" hover={true} padding="small">
              <div class="press-release__header">
                <time class="press-release__date" datetime={release.date}>
                  {formatDate(release.date)}
                </time>
              </div>
              
              <div class="press-release__image">
                {#if release.featuredImage && (release.featuredImage.url || release.featuredImage)}
                  <!-- Loading placeholder -->
                  <div class="press-release__image-loading">
                    <div class="image-loading-spinner"></div>
                  </div>
                  
                  <img 
                    src={release.featuredImage.url || release.featuredImage} 
                    alt={release.featuredImage.alt || release.title}
                    loading="lazy"
                    on:load={handleImageLoad}
                    on:error={handleImageError}
                    style="opacity: 0;"
                  />
                  
                  <div class="press-release__image-placeholder" style="display: none;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="placeholder-text">Image Unavailable</span>
                  </div>
                {:else}
                  <div class="press-release__image-placeholder">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.25 9.75L16.5 12L14.25 14.25M9.75 14.25L7.5 12L9.75 9.75M6 20.25H18C19.2426 20.25 20.25 19.2426 20.25 18V6C20.25 4.75736 19.2426 3.75 18 3.75H6C4.75736 3.75 3.75 4.75736 3.75 6V18C3.75 19.2426 4.75736 20.25 6 20.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="placeholder-text">Press Release</span>
                  </div>
                {/if}
              </div>
              
              <h3 class="press-release__title">{release.title}</h3>
              <p class="press-release__excerpt">
                {typeof release.excerpt === 'string' ? release.excerpt : 'No excerpt available'}
              </p>
            </Card>
          </div>
        {:else}
          <div class="empty-state">
            <p class="empty-state__text">No press releases available at this time.</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  {/if}
</div>

<style>
  .page {
    flex: 1;
    padding-top: 4rem; /* Account for fixed header */
    background-color: var(--color-night);
  }
  
  /* Hero Section */
  .hero {
    padding: var(--space-20) 0;
    position: relative;
    overflow: hidden;
  }
  
  .hero__container {
    max-width: var(--content-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
    text-align: center;
  }
  
  .hero__title {
    font-family: var(--font-heading);
    font-size: var(--text-6xl);
    font-weight: var(--weight-bold);
    color: var(--color-text-on-dark);
    margin: 0 0 var(--space-6) 0;
    line-height: var(--leading-tight);
  }
  
  .hero__subtitle {
    font-family: var(--font-body);
    font-size: var(--text-xl);
    color: rgba(254, 253, 251, 0.8);
    margin: 0;
    line-height: var(--leading-relaxed);
    max-width: 600px;
    margin: 0 auto;
  }
  
  /* Section Styles */
  .press-releases {
    padding: var(--space-20) 0;
  }
  
  .press-releases__container {
    max-width: var(--container-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
  }
  
  /* Section Headers */
  .section__header {
    text-align: center;
    margin-bottom: var(--space-16);
  }
  
  .section__title {
    font-family: var(--font-heading);
    font-size: var(--text-3xl);
    font-weight: var(--weight-bold);
    color: var(--color-olive-light);
    margin: 0 0 var(--space-4) 0;
    text-align: center;
    line-height: var(--leading-tight);
  }
  
  .section__accent-line {
    width: 60px;
    height: 3px;
    background-color: var(--color-olive-light);
    margin: 0 auto;
  }
  

  
  /* Press Releases */
  .press-releases {
    background-color: rgba(47, 62, 59, 0.6);
  }
  
  .press-releases__grid {
    display: grid;
    gap: var(--space-6);
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
  
  .press-release-card {
    cursor: pointer;
    transition: transform 200ms ease;
  }
  
  .press-release-card:focus {
    outline: 2px solid var(--color-olive-light);
    outline-offset: 2px;
    border-radius: 0.75rem;
  }
  
  .press-releases__grid :global(.card) {
    height: 100%;
    background-color: rgba(47, 62, 59, 0.6) !important;
    border-color: rgba(139, 126, 83, 0.3) !important;
  }
  
  .press-releases__grid :global(.card:hover) {
    background-color: rgba(47, 62, 59, 0.8) !important;
    border-left: 4px solid var(--color-olive-light) !important;
    box-shadow: 0 8px 24px rgba(47, 62, 59, 0.4) !important;
  }
  
  .press-release__header {
    margin-bottom: var(--space-4);
  }
  
  .press-release__date {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-olive-light);
    font-weight: var(--weight-medium);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .press-release__image {
    margin: var(--space-3) 0 var(--space-4) 0;
    border-radius: 0.75rem;
    overflow: hidden;
    aspect-ratio: 16 / 10;
    background: linear-gradient(135deg, rgba(47, 62, 59, 0.4), rgba(139, 126, 83, 0.1));
    position: relative;
    border: 1px solid rgba(139, 126, 83, 0.2);
    box-shadow: 0 2px 8px rgba(47, 62, 59, 0.2);
    transition: box-shadow 300ms ease;
  }
  
  .press-release-card:hover .press-release__image {
    box-shadow: 0 4px 16px rgba(47, 62, 59, 0.3);
  }
  
  .press-release__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 400ms ease, opacity 300ms ease;
    background-color: rgba(47, 62, 59, 0.2);
  }
  
  .press-release__image::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, transparent 0%, transparent 60%, rgba(47, 62, 59, 0.8) 100%);
    opacity: 0;
    transition: opacity 300ms ease;
    pointer-events: none;
  }
  
  .press-release-card:hover .press-release__image::after {
    opacity: 1;
  }
  
  .press-release__image img[loading] {
    opacity: 0;
  }
  
  .press-release__image img:not([loading]) {
    opacity: 1;
  }
  
  .press-release-card:hover .press-release__image img {
    transform: scale(1.08);
  }
  
  .press-release__image-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    background: linear-gradient(135deg, rgba(47, 62, 59, 0.4), rgba(139, 126, 83, 0.15));
    color: var(--color-olive-light);
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
  }
  
  .placeholder-text {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: var(--weight-medium);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-olive-light);
    opacity: 0.8;
  }
  
  .press-release__image-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(47, 62, 59, 0.3), rgba(139, 126, 83, 0.1));
    z-index: 1;
  }
  
  .image-loading-spinner {
    width: 24px;
    height: 24px;
    border: 2px solid rgba(139, 126, 83, 0.3);
    border-top: 2px solid var(--color-olive-light);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  .press-release__title {
    font-family: var(--font-heading);
    font-size: var(--text-lg);
    font-weight: var(--weight-semibold);
    color: var(--color-white-warm);
    margin: 0 0 var(--space-3) 0;
    line-height: var(--leading-tight);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .press-release__excerpt {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-white-warm);
    margin: 0;
    line-height: var(--leading-normal);
    opacity: 0.9;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  /* Empty State */
  .empty-state {
    grid-column: 1 / -1;
    text-align: center;
    padding: var(--space-12) var(--space-8);
    background-color: rgba(47, 62, 59, 0.6);
    border-radius: 0.75rem;
    border: 1px solid rgba(139, 126, 83, 0.2);
  }
  
  .empty-state__text {
    font-family: var(--font-body);
    font-size: var(--text-lg);
    color: var(--color-white-warm);
    margin: 0;
    opacity: 0.8;
    font-style: italic;
  }
  
  /* Loading State */
  .loading {
    padding: var(--space-20) 0;
    text-align: center;
    background-color: rgba(47, 62, 59, 0.6);
  }
  
  .loading__container {
    max-width: var(--container-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
  }
  
  .loading__spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(139, 126, 83, 0.3);
    border-top: 3px solid var(--color-olive-light);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto var(--space-4) auto;
  }
  
  .loading__text {
    font-family: var(--font-body);
    font-size: var(--text-lg);
    color: var(--color-white-warm);
    margin: 0;
    opacity: 0.9;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Error State */
  .error {
    padding: var(--space-20) 0;
    text-align: center;
    background-color: rgba(47, 62, 59, 0.7);
  }
  
  .error__container {
    max-width: var(--container-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
  }
  
  .error__title {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: var(--weight-semibold);
    color: var(--color-white-warm);
    margin: 0 0 var(--space-4) 0;
  }
  
  .error__message {
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: var(--color-white-warm);
    margin: 0 0 var(--space-8) 0;
    line-height: var(--leading-normal);
    opacity: 0.9;
  }
  
  /* Responsive Design */
  @media (max-width: 767px) {
    .page {
      padding-top: 3.5rem; /* Account for smaller mobile header */
    }
    
    .hero,
    .press-releases,
    .loading,
    .error {
      padding: var(--space-16) 0;
    }
    
    .hero__title {
      font-size: var(--text-4xl);
    }
    
    .hero__subtitle {
      font-size: var(--text-lg);
    }
    
    .section__header {
      margin-bottom: var(--space-12);
    }
    
    .section__title {
      font-size: var(--text-2xl);
    }
    
    .press-releases__grid {
      gap: var(--space-4);
      grid-template-columns: 1fr;
    }
    
    .press-release__image {
      margin: var(--space-2) 0 var(--space-3) 0;
      aspect-ratio: 16 / 9;
    }
    
    .press-release__title {
      font-size: var(--text-base);
      margin-bottom: var(--space-2);
    }
    
    .press-release__excerpt {
      font-size: var(--text-xs);
      -webkit-line-clamp: 2;
      line-clamp: 2;
    }
  }
  
  @media (min-width: 768px) {
    .press-releases__grid {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
  }
  
  @media (min-width: 1200px) {
    .press-releases__grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>