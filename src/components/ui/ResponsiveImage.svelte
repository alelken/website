<script>
  import { onMount } from 'svelte';
  
  export let src = '';
  export let alt = '';
  export let width = null;
  export let height = null;
  export let sizes = '100vw';
  export let srcset = '';
  export let loading = 'lazy';
  export let decoding = 'async';
  export let fetchpriority = 'auto';
  export let placeholder = '/assets/placeholder.svg';
  export let className = '';
  export let objectFit = 'cover';
  export let aspectRatio = null;
  
  let imageElement;
  let isLoaded = false;
  let hasError = false;
  let isIntersecting = false;
  
  // Intersection Observer for lazy loading
  onMount(() => {
    if (loading === 'lazy' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              isIntersecting = true;
              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: '50px' // Start loading 50px before the image enters viewport
        }
      );
      
      if (imageElement) {
        observer.observe(imageElement);
      }
      
      return () => {
        if (imageElement) {
          observer.unobserve(imageElement);
        }
      };
    } else {
      // Fallback for browsers without IntersectionObserver
      isIntersecting = true;
    }
  });
  
  function handleLoad() {
    isLoaded = true;
    hasError = false;
  }
  
  function handleError() {
    hasError = true;
    isLoaded = false;
  }
  
  // Generate responsive srcset if not provided
  $: responsiveSrcset = srcset || generateSrcset(src);
  
  function generateSrcset(baseSrc) {
    if (!baseSrc || baseSrc.includes('placeholder')) return '';
    
    const ext = baseSrc.split('.').pop();
    const baseName = baseSrc.replace(`.${ext}`, '');
    
    // Generate common responsive sizes
    return [
      `${baseName}-400w.${ext} 400w`,
      `${baseName}-800w.${ext} 800w`,
      `${baseName}-1200w.${ext} 1200w`,
      `${baseName}-1600w.${ext} 1600w`
    ].join(', ');
  }
  
  // Determine which image to show
  $: imageSrc = hasError ? placeholder : (isIntersecting || loading === 'eager') ? src : placeholder;
</script>

<div 
  class="responsive-image {className}"
  class:responsive-image--loading={!isLoaded && !hasError}
  class:responsive-image--error={hasError}
  style:aspect-ratio={aspectRatio}
  bind:this={imageElement}
>
  <img
    src={imageSrc}
    {alt}
    {width}
    {height}
    {sizes}
    srcset={responsiveSrcset}
    loading={loading}
    decoding={decoding}
    fetchpriority={fetchpriority}
    class="responsive-image__img"
    style:object-fit={objectFit}
    on:load={handleLoad}
    on:error={handleError}
  />
  
  {#if !isLoaded && !hasError}
    <div class="responsive-image__placeholder">
      <div class="responsive-image__spinner"></div>
    </div>
  {/if}
  
  {#if hasError}
    <div class="responsive-image__error">
      <svg class="responsive-image__error-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" fill="currentColor"/>
      </svg>
      <span class="responsive-image__error-text">Image failed to load</span>
    </div>
  {/if}
</div>

<style>
  .responsive-image {
    position: relative;
    display: block;
    width: 100%;
    overflow: hidden;
    background-color: var(--color-cream-soft);
  }
  
  .responsive-image__img {
    width: 100%;
    height: 100%;
    display: block;
    transition: opacity 300ms ease;
  }
  
  .responsive-image--loading .responsive-image__img {
    opacity: 0;
  }
  
  .responsive-image--error .responsive-image__img {
    opacity: 0.3;
  }
  
  .responsive-image__placeholder {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-cream-soft);
  }
  
  .responsive-image__spinner {
    width: 32px;
    height: 32px;
    border: 3px solid var(--color-olive-light);
    border-top: 3px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  .responsive-image__error {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--color-cream-soft);
    color: var(--color-text-secondary);
    padding: var(--space-4);
    text-align: center;
  }
  
  .responsive-image__error-icon {
    width: 48px;
    height: 48px;
    margin-bottom: var(--space-2);
    opacity: 0.5;
  }
  
  .responsive-image__error-text {
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Mobile optimizations */
  @media (max-width: 767px) {
    .responsive-image__spinner {
      width: 24px;
      height: 24px;
      border-width: 2px;
    }
    
    .responsive-image__error-icon {
      width: 32px;
      height: 32px;
    }
    
    .responsive-image__error-text {
      font-size: var(--text-xs);
    }
  }
  
  /* Reduce motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    .responsive-image__img {
      transition: none;
    }
    
    .responsive-image__spinner {
      animation: none;
    }
  }
</style>