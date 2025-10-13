<script>
  const currentYear = new Date().getFullYear();
  
  const contactLinks = [
    {
      label: 'Support',
      href: 'mailto:support@alelken.in',
      icon: 'email'
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/company/alelken',
      icon: 'linkedin',
      external: true
    }
  ];
</script>

<footer class="footer">
  <div class="footer__container">
    <div class="footer__content">
      <!-- Brand Section -->
      <div class="footer__brand">
        <div class="footer__logo">
          <img 
            src="/assets/logo/5.png" 
            alt="Alelken" 
            class="footer__logo-image"
            width="32"
            height="32"
          />
          <span class="footer__brand-text">ALELKEN</span>
        </div>
        <p class="footer__tagline">
          Building tomorrow's solutions with technology for human potential
        </p>
      </div>
      
      <!-- Links Section -->
      <div class="footer__links">
        <h3 class="footer__links-title">Connect</h3>
        <ul class="footer__links-list">
          {#each contactLinks as link}
            <li class="footer__links-item">
              <a 
                href={link.href}
                class="footer__link"
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                aria-label={link.external ? `${link.label} (opens in new tab)` : link.label}
              >
                <span class="footer__link-icon" aria-hidden="true">
                  {#if link.icon === 'email'}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  {:else if link.icon === 'linkedin'}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  {/if}
                </span>
                {link.label}
                {#if link.external}
                  <span class="footer__external-icon" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15,3 21,3 21,9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </span>
                {/if}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
    
    <!-- Bottom Section -->
    <div class="footer__bottom">
      <div class="footer__bottom-content">
        <p class="footer__copyright">
          © {currentYear} Alelken. Building in the open.
        </p>
        <p class="footer__mission">
          Technology for Human Potential
        </p>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer {
    background-color: var(--color-background-dark);
    color: var(--color-text-on-dark);
    margin-top: auto;
    border-top: 1px solid rgba(139, 126, 83, 0.3);
  }
  
  .footer__container {
    max-width: var(--container-max-width);
    margin: 0 auto;
    padding: var(--space-16) var(--container-padding) var(--space-8);
  }
  
  .footer__content {
    display: grid;
    gap: var(--space-12);
    margin-bottom: var(--space-12);
  }
  
  /* Brand Section */
  .footer__brand {
    max-width: 24rem;
  }
  
  .footer__logo {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-4);
  }
  
  .footer__logo-image {
    width: 32px;
    height: 32px;
    object-fit: contain;
    filter: brightness(0) invert(1);
  }
  
  .footer__brand-text {
    font-family: var(--font-brand);
    font-size: var(--text-xl);
    font-weight: var(--weight-bold);
    color: var(--color-text-on-dark);
    text-transform: uppercase;
    letter-spacing: var(--tracking-wide);
  }
  
  .footer__tagline {
    font-family: var(--font-body);
    font-size: var(--text-base);
    line-height: var(--leading-relaxed);
    color: rgba(254, 253, 251, 0.8);
    margin: 0;
  }
  
  /* Links Section */
  .footer__links {
    /* Styles will be applied via grid layout */
  }
  
  .footer__links-title {
    font-family: var(--font-heading);
    font-size: var(--text-lg);
    font-weight: var(--weight-semibold);
    color: var(--color-text-on-dark);
    margin: 0 0 var(--space-4) 0;
  }
  
  .footer__links-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }
  
  .footer__links-item {
    /* Individual list item styles */
  }
  
  .footer__link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-family: var(--font-body);
    font-size: var(--text-base);
    font-weight: var(--weight-medium);
    color: rgba(254, 253, 251, 0.8);
    text-decoration: none;
    transition: color 200ms ease;
    padding: var(--space-1) 0;
  }
  
  .footer__link:hover {
    color: var(--color-text-on-dark);
  }
  
  .footer__link:focus {
    outline: 2px solid var(--color-border-accent);
    outline-offset: 2px;
    border-radius: 4px;
  }
  
  .footer__link-icon {
    display: flex;
    align-items: center;
    color: var(--color-olive-light);
  }
  
  .footer__external-icon {
    display: flex;
    align-items: center;
    opacity: 0.6;
    margin-left: var(--space-1);
  }
  
  /* Bottom Section */
  .footer__bottom {
    border-top: 1px solid rgba(254, 253, 251, 0.1);
    padding-top: var(--space-8);
  }
  
  .footer__bottom-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    text-align: center;
  }
  
  .footer__copyright {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: rgba(254, 253, 251, 0.6);
    margin: 0;
  }
  
  .footer__mission {
    font-family: var(--font-heading);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    color: var(--color-olive-light);
    margin: 0;
  }
  
  /* Responsive Styles */
  @media (min-width: 768px) {
    .footer__content {
      grid-template-columns: 1fr auto;
      align-items: start;
    }
    
    .footer__bottom-content {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      text-align: left;
    }
  }
  
  @media (min-width: 1024px) {
    .footer__container {
      padding-top: var(--space-20);
      padding-bottom: var(--space-12);
    }
    
    .footer__content {
      gap: var(--space-16);
    }
  }
  
  /* Focus and accessibility improvements */
  @media (prefers-reduced-motion: reduce) {
    .footer__link {
      transition: none;
    }
  }
  
  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .footer {
      border-top: 2px solid;
    }
    
    .footer__bottom {
      border-top-width: 2px;
    }
  }
</style>