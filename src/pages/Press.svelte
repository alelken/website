<script>
  import { onMount } from 'svelte';
  import Card from '../components/ui/Card.svelte';
  import Button from '../components/ui/Button.svelte';
  import { getPressReleases } from '../lib/prismic.js';
  
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

  // Load content from Prismic on component mount
  onMount(async () => {
    try {
      loading = true;
      
      // Load press releases
      pressReleases = await getPressReleases();
      console.log('Loaded press releases:', pressReleases);
      
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
      <h1 class="hero__title">Blog</h1>
      <p class="hero__subtitle">
        Latest insights and updates from Alelken
      </p>
    </div>
  </section>
  
  <!-- Loading State -->
  {#if loading}
    <section class="loading">
      <div class="loading__container">
        <div class="loading__spinner"></div>
        <p class="loading__text">Loading press content...</p>
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
        <h2 class="section__title">Latest Posts</h2>
        <div class="section__accent-line"></div>
      </div>
      <div class="press-releases__grid">
        {#each pressReleases as release}
          <Card variant="outlined" hover={true}>
            <div class="press-release__header">
              <time class="press-release__date" datetime={release.date}>
                {formatDate(release.date)}
              </time>
            </div>
            <h3 class="press-release__title">{release.title}</h3>
            <p class="press-release__excerpt">{release.excerpt}</p>
            <div class="press-release__actions">
              <Button variant="outline" size="small" href={`/press/${release.slug || release.uid}`}>
                Read More
              </Button>
            </div>
          </Card>
        {:else}
          <div class="empty-state">
            <p class="empty-state__text">No blog posts available at this time.</p>
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
    gap: var(--space-8);
    grid-template-columns: 1fr;
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
  
  .press-release__title {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: var(--weight-semibold);
    color: var(--color-white-warm);
    margin: 0 0 var(--space-4) 0;
    line-height: var(--leading-tight);
  }
  
  .press-release__excerpt {
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: var(--color-white-warm);
    margin: 0 0 var(--space-6) 0;
    line-height: var(--leading-normal);
    opacity: 0.9;
  }
  
  .press-release__actions {
    margin-top: auto;
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
      gap: var(--space-6);
    }
  }
  
  @media (min-width: 768px) {
    .press-releases__grid {
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    }
  }
</style>