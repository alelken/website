<script>
  import { onMount } from 'svelte';
  import { getPressReleaseByUid } from '../lib/prismic.js';
  import Button from '../components/ui/Button.svelte';
  import { navigateToPressList, routeParams } from '../lib/stores/router.js';
  import { contentToHtml } from '../lib/markdown.js';
  
  export let uid;
  
  let post = null;
  let loading = true;
  let error = null;
  
  // Helper function to format dates safely
  function formatDate(dateString) {
    if (!dateString) return 'Date not available';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (error) {
      return 'Date formatting error';
    }
  }
  
  onMount(async () => {
    try {
      loading = true;
      post = await getPressReleaseByUid(uid);
      
      if (!post) {
        error = 'Press release not found';
      } else {
        // Update route params with post metadata for SEO
        routeParams.update(params => ({
          ...params,
          title: post.title,
          excerpt: post.excerpt
        }));
      }
    } catch (err) {
      console.error('Error loading press release:', err);
      error = 'Failed to load press release. Please try again later.';
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  {#if post}
    <title>{post.title} - Alelken</title>
    <meta name="description" content={post.excerpt} />
    <meta property="og:title" content={post.title} />
    <meta property="og:description" content={post.excerpt} />
    <meta property="og:type" content="article" />
    {#if post.featuredImage}
      <meta property="og:image" content={post.featuredImage.url} />
    {/if}
  {/if}
</svelte:head>

<div class="page page--blog-detail">
  {#if loading}
    <!-- Loading State -->
    <section class="loading">
      <div class="loading__container">
        <div class="loading__spinner"></div>
        <p class="loading__text">Loading press release...</p>
      </div>
    </section>
  {:else if error}
    <!-- Error State -->
    <section class="error">
      <div class="error__container">
        <h1 class="error__title">Press Release Not Found</h1>
        <p class="error__message">{error}</p>
        <Button variant="primary" on:click={navigateToPressList}>
          Back to Press Releases
        </Button>
      </div>
    </section>
  {:else if post}
    <!-- Blog Post Content -->
    <article class="blog-post">
      <!-- Back Link -->
      <nav class="back-nav">
        <button 
          class="back-link" 
          on:click={navigateToPressList}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Press Releases</span>
        </button>
      </nav>
      
      <div class="blog-post__container">
        <!-- Header -->
        <header class="blog-post__header">
          <div class="blog-post__meta">
            <time class="blog-post__date" datetime={post.date}>
              {formatDate(post.date)}
            </time>
          </div>
          <h1 class="blog-post__title">{post.title}</h1>
          {#if post.author}
            <div class="blog-post__author">by {post.author}</div>
          {/if}
          {#if post.excerpt && typeof post.excerpt === 'string'}
            <p class="blog-post__excerpt">{post.excerpt}</p>
          {/if}
        </header>
        
        <!-- Featured Image -->
        {#if post.featuredImage}
          <div class="blog-post__image">
            <img 
              src={post.featuredImage.url} 
              alt={post.featuredImage.alt || post.title}
            />
          </div>
        {/if}
        
        <!-- Content -->
        <div class="blog-post__content">
          {#if typeof post.content === 'string'}
            {@html contentToHtml(post.content)}
          {:else}
            <p>Content not available</p>
          {/if}
        </div>
        
        <!-- Footer -->
        <footer class="blog-post__footer">
          {#if post.tags && post.tags.length > 0}
            <div class="blog-post__tags">
              <span class="blog-post__tags-label">Tags:</span>
              {#each post.tags as tag}
                <span class="blog-post__tag">{tag}</span>
              {/each}
            </div>
          {/if}
          

        </footer>
      </div>
    </article>
  {/if}
</div>

<style>
  .page {
    flex: 1;
    padding-top: 4rem;
    background-color: var(--color-night);
    min-height: 100vh;
  }
  
  /* Loading State */
  .loading {
    padding: var(--space-20) 0;
    text-align: center;
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
  }
  
  .error__container {
    max-width: var(--container-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
  }
  
  .error__title {
    font-family: var(--font-heading);
    font-size: var(--text-3xl);
    font-weight: var(--weight-bold);
    color: var(--color-white-warm);
    margin: 0 0 var(--space-4) 0;
  }
  
  .error__message {
    font-family: var(--font-body);
    font-size: var(--text-lg);
    color: var(--color-white-warm);
    margin: 0 0 var(--space-8) 0;
    opacity: 0.9;
  }
  
  /* Blog Post */
  .blog-post {
    padding: var(--space-16) 0 var(--space-20) 0;
    position: relative;
  }
  
  /* Back Navigation */
  .back-nav {
    margin-bottom: var(--space-8);
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 var(--container-padding);
  }
  
  .back-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    background: none;
    border: none;
    color: var(--color-olive-light);
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    cursor: pointer;
    transition: all 200ms ease;
    padding: var(--space-2) 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .back-link:hover {
    color: var(--color-white-warm);
    transform: translateX(-2px);
  }
  
  .back-link:focus {
    outline: 2px solid var(--color-olive-light);
    outline-offset: 2px;
    border-radius: 4px;
  }
  
  .back-link svg {
    transition: transform 200ms ease;
  }
  
  .back-link:hover svg {
    transform: translateX(-2px);
  }
  
  .blog-post__container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 var(--container-padding);
    position: relative;
  }
  
  /* Header */
  .blog-post__header {
    margin-bottom: var(--space-12);
    text-align: center;
  }
  
  .blog-post__meta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-4);
    margin-bottom: var(--space-6);
    flex-wrap: wrap;
  }
  
  .blog-post__date {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-olive-light);
    font-weight: var(--weight-medium);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .blog-post__author {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-white-warm);
    opacity: 0.8;
    margin-top: var(--space-2);
    margin-bottom: var(--space-6);
  }
  
  .blog-post__title {
    font-family: var(--font-heading);
    font-size: var(--text-4xl);
    font-weight: var(--weight-bold);
    color: var(--color-white-warm);
    margin: 0 0 var(--space-6) 0;
    line-height: var(--leading-tight);
  }
  
  .blog-post__excerpt {
    font-family: var(--font-body);
    font-size: var(--text-xl);
    color: var(--color-white-warm);
    margin: 0;
    line-height: var(--leading-relaxed);
    opacity: 0.9;
    font-style: italic;
  }
  
  /* Featured Image */
  .blog-post__image {
    margin-bottom: var(--space-12);
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(47, 62, 59, 0.3);
  }
  
  .blog-post__image img {
    width: 100%;
    height: auto;
    display: block;
  }
  
  /* Content */
  .blog-post__content {
    margin-bottom: var(--space-16);
  }
  
  .blog-post__content :global(p) {
    font-family: var(--font-body);
    font-size: var(--text-lg);
    color: var(--color-white-warm);
    line-height: var(--leading-relaxed);
    margin: 0 0 var(--space-6) 0;
  }
  
  .blog-post__content :global(h1),
  .blog-post__content :global(h2),
  .blog-post__content :global(h3),
  .blog-post__content :global(h4),
  .blog-post__content :global(h5),
  .blog-post__content :global(h6) {
    font-family: var(--font-heading);
    font-weight: var(--weight-semibold);
    color: var(--color-olive-light);
    margin: var(--space-8) 0 var(--space-4) 0;
    line-height: var(--leading-tight);
  }
  
  .blog-post__content :global(h2) {
    font-size: var(--text-2xl);
  }
  
  .blog-post__content :global(h3) {
    font-size: var(--text-xl);
  }
  
  .blog-post__content :global(blockquote) {
    border-left: 4px solid var(--color-olive-light);
    padding-left: var(--space-6);
    margin: var(--space-8) 0;
    font-style: italic;
    color: var(--color-white-warm);
    opacity: 0.9;
  }
  
  .blog-post__content :global(ul),
  .blog-post__content :global(ol) {
    margin: var(--space-6) 0;
    padding-left: var(--space-8);
  }
  
  .blog-post__content :global(li) {
    font-family: var(--font-body);
    font-size: var(--text-lg);
    color: var(--color-white-warm);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-2);
  }
  
  /* Footer */
  .blog-post__footer {
    border-top: 1px solid rgba(139, 126, 83, 0.2);
    padding-top: var(--space-8);
  }
  
  .blog-post__tags {
    margin-bottom: var(--space-8);
  }
  
  .blog-post__tags-label {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-olive-light);
    font-weight: var(--weight-medium);
    margin-right: var(--space-4);
  }
  
  .blog-post__tag {
    display: inline-block;
    background-color: rgba(139, 126, 83, 0.2);
    color: var(--color-olive-light);
    font-family: var(--font-body);
    font-size: var(--text-sm);
    padding: var(--space-1) var(--space-3);
    border-radius: 1rem;
    margin-right: var(--space-2);
    margin-bottom: var(--space-2);
  }
  
  /* Responsive Design */
  @media (max-width: 767px) {
    .page {
      padding-top: 3.5rem;
    }
    
    .blog-post {
      padding: var(--space-12) 0 var(--space-16) 0;
    }
    
    .back-nav {
      margin-bottom: var(--space-6);
      padding: 0 var(--space-4);
    }
    
    .back-link {
      font-size: var(--text-xs);
    }
    
    .blog-post__title {
      font-size: var(--text-3xl);
    }
    
    .blog-post__excerpt {
      font-size: var(--text-lg);
    }
    
    .blog-post__content :global(p),
    .blog-post__content :global(li) {
      font-size: var(--text-base);
    }
    
    .blog-post__meta {
      flex-direction: column;
      gap: var(--space-2);
    }
  }
  
  @media (min-width: 768px) {
    .back-nav {
      margin-bottom: var(--space-10);
    }
    
    .back-link {
      font-size: var(--text-sm);
    }
  }
</style>