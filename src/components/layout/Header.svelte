<script>
  import { createEventDispatcher } from 'svelte';
  
  export let currentPage = 'home';
  
  const dispatch = createEventDispatcher();
  let isMenuOpen = false;
  
  const navigationItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'product', label: 'Product', href: '#product' },
    { id: 'press', label: 'Press', href: '#press' },
    { id: 'about', label: 'About', href: '#about' }
  ];
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
  
  function handleNavClick(pageId) {
    dispatch('navigate', { page: pageId });
    isMenuOpen = false; // Close mobile menu after navigation
  }
  
  function handleKeydown(event, pageId) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleNavClick(pageId);
    }
  }
  
  // Close menu when clicking outside
  function handleOutsideClick(event) {
    if (isMenuOpen && !event.target.closest('.header')) {
      isMenuOpen = false;
    }
  }
</script>

<svelte:window on:click={handleOutsideClick} />

<header class="header">
  <div class="header__container">
    <!-- Brand/Logo -->
    <div class="header__brand">
      <a 
        href="#home" 
        class="header__logo-link"
        on:click={() => handleNavClick('home')}
        aria-label="Alelken - Go to homepage"
      >
        <img 
          src="/assets/logo/5.png" 
          alt="Alelken" 
          class="header__logo"
          width="48"
          height="48"
        />
        <span class="header__brand-text">ALELKEN</span>
      </a>
    </div>
    
    <!-- Desktop Navigation -->
    <nav class="header__nav" aria-label="Main navigation">
      <ul class="header__nav-list">
        {#each navigationItems as item}
          <li class="header__nav-item">
            <a
              href={item.href}
              class="header__nav-link"
              class:header__nav-link--active={currentPage === item.id}
              on:click={() => handleNavClick(item.id)}
              on:keydown={(e) => handleKeydown(e, item.id)}
              aria-current={currentPage === item.id ? 'page' : undefined}
            >
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
    
    <!-- Mobile Menu Toggle -->
    <button
      class="header__menu-toggle"
      class:header__menu-toggle--active={isMenuOpen}
      on:click={toggleMenu}
      aria-expanded={isMenuOpen}
      aria-controls="mobile-menu"
      aria-label="Toggle navigation menu"
    >
      <span class="header__menu-icon">
        <span class="header__menu-line"></span>
        <span class="header__menu-line"></span>
        <span class="header__menu-line"></span>
      </span>
    </button>
  </div>
  
  <!-- Mobile Navigation Menu -->
  <div 
    class="header__mobile-menu"
    class:header__mobile-menu--open={isMenuOpen}
    id="mobile-menu"
    aria-hidden={!isMenuOpen}
  >
    <nav class="header__mobile-nav" aria-label="Mobile navigation">
      <ul class="header__mobile-nav-list">
        {#each navigationItems as item}
          <li class="header__mobile-nav-item">
            <a
              href={item.href}
              class="header__mobile-nav-link"
              class:header__mobile-nav-link--active={currentPage === item.id}
              on:click={() => handleNavClick(item.id)}
              on:keydown={(e) => handleKeydown(e, item.id)}
              aria-current={currentPage === item.id ? 'page' : undefined}
              tabindex={isMenuOpen ? 0 : -1}
            >
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
</header>

<style>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: rgba(47, 62, 59, 0.95);
    border-bottom: 1px solid rgba(139, 126, 83, 0.2);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    transition: all 300ms ease;
  }
  
  .header__container {
    max-width: var(--container-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem; /* 64px */
  }
  
  /* Brand/Logo Styles */
  .header__brand {
    display: flex;
    align-items: center;
  }
  
  .header__logo-link {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    text-decoration: none;
    color: var(--color-text-on-dark);
    transition: opacity 200ms ease;
  }
  
  .header__logo-link:hover {
    opacity: 0.8;
  }
  
  .header__logo-link:focus {
    outline: 2px solid var(--color-border-accent);
    outline-offset: 2px;
    border-radius: 4px;
  }
  
  .header__logo {
    width: 48px;
    height: 48px;
    object-fit: contain;
  }
  
  .header__brand-text {
    font-family: var(--font-brand);
    font-size: var(--text-xl);
    font-weight: var(--weight-bold);
    color: var(--color-olive-light);
    text-transform: uppercase;
    letter-spacing: var(--tracking-wide);
  }
  
  /* Desktop Navigation Styles */
  .header__nav {
    display: none;
  }
  
  .header__nav-list {
    display: flex;
    align-items: center;
    gap: var(--space-8);
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .header__nav-item {
    position: relative;
  }
  
  .header__nav-link {
    display: block;
    padding: var(--space-2) var(--space-1);
    font-family: var(--font-body);
    font-size: var(--text-base);
    font-weight: var(--weight-medium);
    color: rgba(254, 253, 251, 0.8);
    text-decoration: none;
    transition: color 200ms ease;
    position: relative;
  }
  
  .header__nav-link:hover {
    color: var(--color-olive-light);
  }
  
  .header__nav-link:focus {
    outline: 2px solid var(--color-border-accent);
    outline-offset: 2px;
    border-radius: 4px;
  }
  
  .header__nav-link--active {
    color: var(--color-olive-light);
  }
  
  .header__nav-link--active::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: var(--color-olive-light);
    border-radius: 1px;
  }
  
  /* Mobile Menu Toggle Styles */
  .header__menu-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    border-radius: 4px;
    transition: background-color 200ms ease;
  }
  
  .header__menu-toggle:hover {
    background-color: var(--color-background-secondary);
  }
  
  .header__menu-toggle:focus {
    outline: 2px solid var(--color-border-accent);
    outline-offset: 2px;
  }
  
  .header__menu-icon {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 20px;
    height: 16px;
  }
  
  .header__menu-line {
    width: 100%;
    height: 2px;
    background-color: var(--color-text-on-dark);
    border-radius: 1px;
    transition: all 300ms ease;
    transform-origin: center;
  }
  
  .header__menu-toggle--active .header__menu-line:nth-child(1) {
    transform: translateY(6px) rotate(45deg);
  }
  
  .header__menu-toggle--active .header__menu-line:nth-child(2) {
    opacity: 0;
  }
  
  .header__menu-toggle--active .header__menu-line:nth-child(3) {
    transform: translateY(-6px) rotate(-45deg);
  }
  
  /* Mobile Menu Styles */
  .header__mobile-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: rgba(47, 62, 59, 0.98);
    border-bottom: 1px solid rgba(139, 126, 83, 0.2);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 300ms ease;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  
  .header__mobile-menu--open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
  
  .header__mobile-nav {
    padding: var(--space-4) 0;
  }
  
  .header__mobile-nav-list {
    max-width: var(--container-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
    list-style: none;
  }
  
  .header__mobile-nav-item {
    border-bottom: 1px solid var(--color-border-light);
  }
  
  .header__mobile-nav-item:last-child {
    border-bottom: none;
  }
  
  .header__mobile-nav-link {
    display: block;
    padding: var(--space-4) 0;
    font-family: var(--font-body);
    font-size: var(--text-lg);
    font-weight: var(--weight-medium);
    color: rgba(254, 253, 251, 0.8);
    text-decoration: none;
    transition: color 200ms ease;
  }
  
  .header__mobile-nav-link:hover,
  .header__mobile-nav-link:focus {
    color: var(--color-olive-light);
  }
  
  .header__mobile-nav-link:focus {
    outline: 2px solid var(--color-border-accent);
    outline-offset: 2px;
    border-radius: 4px;
  }
  
  .header__mobile-nav-link--active {
    color: var(--color-olive-light);
    position: relative;
  }
  
  .header__mobile-nav-link--active::before {
    content: '';
    position: absolute;
    left: -var(--container-padding);
    top: 0;
    bottom: 0;
    width: 3px;
    background-color: var(--color-olive-light);
  }
  
  /* Responsive Styles */
  @media (min-width: 768px) {
    .header__nav {
      display: block;
    }
    
    .header__menu-toggle {
      display: none;
    }
    
    .header__mobile-menu {
      display: none;
    }
    
    .header__brand-text {
      display: block;
    }
  }
  
  @media (max-width: 767px) {
    .header__brand-text {
      display: none;
    }
    
    .header__container {
      height: 3.5rem; /* 56px on mobile */
    }
  }
</style>