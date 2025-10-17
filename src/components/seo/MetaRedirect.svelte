<script>
  import { onMount } from 'svelte';
  import { isCrawlbot, getCanonicalUrl, createMetaRedirect } from '../../lib/seo/redirects.js';

  // Props
  export let targetUrl = '';
  export let delay = 2; // Delay in seconds before redirect (increased for safety)
  export let showMessage = true;

  let isBot = false;
  let redirectUrl = '';
  let shouldRedirect = false;

  onMount(() => {
    isBot = isCrawlbot();
    
    // Only proceed if this is actually a crawlbot
    if (!isBot) {
      console.log('MetaRedirect: Regular user detected, no redirect needed');
      return;
    }
    
    // Determine redirect URL
    if (targetUrl) {
      redirectUrl = targetUrl;
    } else {
      // Auto-detect from current hash, but only if we're on root path
      if (window.location.pathname === '/') {
        redirectUrl = getCanonicalUrl(window.location.hash);
      }
    }

    // Only redirect if we have a valid redirect URL and we're not already there
    if (redirectUrl && window.location.href !== redirectUrl && window.location.pathname === '/') {
      shouldRedirect = true;
      console.log(`MetaRedirect: Crawlbot detected, will redirect to ${redirectUrl} in ${delay}s`);
      
      // Add meta redirect to head
      const metaRedirectHTML = createMetaRedirect(redirectUrl);
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = metaRedirectHTML;
      
      // Add each meta tag to head
      Array.from(tempDiv.children).forEach(element => {
        document.head.appendChild(element);
      });

      // Perform the redirect after delay
      setTimeout(() => {
        if (shouldRedirect) {
          window.location.replace(redirectUrl);
        }
      }, delay * 1000);
    }
  });
</script>

<!-- Only show content if this is a crawlbot and we're redirecting -->
{#if shouldRedirect && showMessage}
  <div class="meta-redirect">
    {#if showMessage}
      <div class="meta-redirect__message">
        <h1>Page Moved</h1>
        <p>This page has moved to a new location.</p>
        <p>
          <a href={redirectUrl} class="meta-redirect__link">
            Continue to the new page
          </a>
        </p>
        <p class="meta-redirect__note">
          You will be redirected automatically...
        </p>
      </div>
    {/if}
  </div>
{/if}

<style>
  .meta-redirect {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: var(--color-night, #0a0a0a);
    color: var(--color-text-on-dark, #ffffff);
    font-family: var(--font-body, Arial, sans-serif);
  }

  .meta-redirect__message {
    text-align: center;
    padding: var(--space-8, 2rem);
    max-width: 600px;
  }

  .meta-redirect__message h1 {
    font-size: var(--text-2xl, 2rem);
    margin-bottom: var(--space-4, 1rem);
    color: var(--color-primary, #00ff88);
  }

  .meta-redirect__message p {
    margin-bottom: var(--space-4, 1rem);
    font-size: var(--text-lg, 1.125rem);
    line-height: 1.6;
  }

  .meta-redirect__link {
    color: var(--color-primary, #00ff88);
    text-decoration: none;
    font-weight: 600;
    border-bottom: 2px solid transparent;
    transition: border-color 0.2s ease;
  }

  .meta-redirect__link:hover {
    border-bottom-color: var(--color-primary, #00ff88);
  }

  .meta-redirect__note {
    font-size: var(--text-sm, 0.875rem);
    color: var(--color-text-secondary, #888);
    font-style: italic;
  }
</style>