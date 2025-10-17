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
            class="press-card" 
            on:click={() => navigateToPress(release.slug || release.uid)}
            on:keydown={(e) => e.key === 'Enter' && navigateToPress(release.slug || release.uid)}
            role="button"
            tabindex="0"
            aria-label={`Read press release: ${release.title}`}
          >
            <div class="press-card__image-container">
              {#if release.featuredImage && (release.featuredImage.url || release.featuredImage)}
                <!-- Loading placeholder -->
                <div class="press-card__image-loading">
                  <div class="image-loading-spinner"></div>
                </div>
                
                <img 
                  src={release.featuredImage.url || release.featuredImage} 
                  alt={release.featuredImage.alt || release.title}
                  loading="lazy"
                  class="press-card__image"
                  on:load={handleImageLoad}
                  on:error={handleImageError}
                  style="opacity: 0;"
                />
                
                <div class="press-card__image-placeholder" style="display: none;">
                  <div class="press-card__logo">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
              {:else}
                <div class="press-card__image-placeholder">
                  <div class="press-card__logo">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
              {/if}
              
              <div class="press-card__overlay">
                <time class="press-card__date" datetime={release.date}>
                  {formatDate(release.date)}
                </time>
              </div>
            </div>
            
            <div class="press-card__content">
              <h3 class="press-card__title">{release.title}</h3>
              <p class="press-card__excerpt">
                {typeof release.excerpt === 'string' ? release.excerpt : 'A introductory test'}
              </p>
              
              <div class="press-card__footer">
                <span class="press-card__read-more">
                  Read More
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>
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
  
  .press-card {
    background: linear-gradient(135deg, rgba(47, 62, 59, 0.8) 0%, rgba(47, 62, 59, 0.6) 100%);
    border: 1px solid rgba(139, 126, 83, 0.2);
    border-radius: 1.5rem;
    overflow: hidden;
    cursor: pointer;
    transition: all 400ms ease;
    position: relative;
  }
  
  .press-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 40px rgba(47, 62, 59, 0.4);
    border-color: var(--color-olive-light);
  }
  
  .press-card:focus {
    outline: 2px solid var(--color-olive-light);
    outline-offset: 2px;
  }

  .press-card__image-container {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: linear-gradient(135deg, rgba(47, 62, 59, 0.4), rgba(139, 126, 83, 0.1));
  }

  .press-card__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 400ms ease;
  }

  .press-card:hover .press-card__image {
    transform: scale(1.1);
  }

  .press-card__image-loading {
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

  .press-card__image-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(47, 62, 59, 0.6), rgba(139, 126, 83, 0.2));
  }

  .press-card__logo {
    color: var(--color-olive-light);
    opacity: 0.6;
  }

  .press-card__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(47, 62, 59, 0.8) 0%, transparent 40%, transparent 60%, rgba(47, 62, 59, 0.9) 100%);
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--space-4);
    opacity: 0;
    transition: opacity 300ms ease;
  }

  .press-card:hover .press-card__overlay {
    opacity: 1;
  }

  .press-card__date {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: var(--weight-bold);
    color: var(--color-olive-light);
    background: rgba(139, 126, 83, 0.2);
    padding: var(--space-1) var(--space-3);
    border-radius: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border: 1px solid rgba(139, 126, 83, 0.3);
    backdrop-filter: blur(8px);
  }

  .press-card__content {
    padding: var(--space-6);
  }

  .press-card__title {
    font-family: var(--font-heading);
    font-size: var(--text-lg);
    font-weight: var(--weight-bold);
    color: var(--color-white-warm);
    margin: 0 0 var(--space-3) 0;
    line-height: var(--leading-tight);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .press-card__excerpt {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: rgba(254, 253, 251, 0.85);
    line-height: var(--leading-normal);
    margin: 0 0 var(--space-4) 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .press-card__footer {
    display: flex;
    justify-content: flex-end;
  }

  .press-card__read-more {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    color: var(--color-olive-light);
    display: flex;
    align-items: center;
    gap: var(--space-1);
    transition: all 200ms ease;
  }

  .press-card:hover .press-card__read-more {
    transform: translateX(4px);
  }

  .press-card__read-more svg {
    transition: transform 200ms ease;
  }

  .press-card:hover .press-card__read-more svg {
    transform: rotate(45deg);
  }

  .image-loading-spinner {
    width: 24px;
    height: 24px;
    border: 2px solid rgba(139, 126, 83, 0.3);
    border-top: 2px solid var(--color-olive-light);
    border-radius: 50%;
    animation: spin 1s linear infinite;
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
    
    .press-card__content {
      padding: var(--space-4);
    }
    
    .press-card__title {
      font-size: var(--text-base);
      margin-bottom: var(--space-2);
    }
    
    .press-card__excerpt {
      font-size: var(--text-xs);
      margin-bottom: var(--space-3);
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