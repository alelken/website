import { writable, derived } from 'svelte/store';

// Valid pages for the application
const VALID_PAGES = ['home', 'product', 'press', 'about'];
const DEFAULT_PAGE = 'home';

// Create the current page store
export const currentPage = writable(DEFAULT_PAGE);

// Create navigation state store
export const navigationState = writable({
  isMenuOpen: false,
  previousPage: null,
  isNavigating: false
});

// Derived store for page metadata
export const pageMetadata = derived(currentPage, ($currentPage) => {
  const metadata = {
    home: {
      title: 'Alelken - Technology for Human Potential',
      description: 'Building systems that heal, educate, and sustain through innovative technology solutions.',
      path: '/'
    },
    product: {
      title: 'Alayn - India\'s Life Guide | Alelken',
      description: 'Discover Alayn, our mental wellness platform designed specifically for India\'s unique cultural context.',
      path: '/product'
    },
    press: {
      title: 'Press & Media | Alelken',
      description: 'Latest news, press releases, and media resources from Alelken.',
      path: '/press'
    },
    about: {
      title: 'About Us | Alelken',
      description: 'Meet the team behind Alelken and learn about our mission to build technology for human potential.',
      path: '/about'
    }
  };
  
  return metadata[$currentPage] || metadata[DEFAULT_PAGE];
});

/**
 * Navigate to a specific page
 * @param {string} page - The page to navigate to
 * @param {boolean} updateHistory - Whether to update browser history
 */
export function navigateTo(page, updateHistory = true) {
  try {
    // Validate the page
    if (!VALID_PAGES.includes(page)) {
      console.warn(`Invalid page: ${page}. Redirecting to ${DEFAULT_PAGE}`);
      page = DEFAULT_PAGE;
    }
    
    // Get current page for previousPage tracking
    let previousPageValue;
    currentPage.subscribe(value => previousPageValue = value)();
    
    // Update navigation state
    navigationState.update(state => ({
      ...state,
      isNavigating: true,
      previousPage: previousPageValue
    }));
    
    // Update the current page
    currentPage.set(page);
    
    // Update browser history and URL hash
    if (updateHistory) {
      const newHash = page === DEFAULT_PAGE ? '' : `#${page}`;
      if (window.location.hash !== newHash) {
        window.location.hash = newHash;
      }
    }
    
    // Update page title and meta description
    pageMetadata.subscribe(metadata => {
      document.title = metadata.title;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', metadata.description);
      }
    })();
    
    // Reset navigation state after a brief delay
    setTimeout(() => {
      navigationState.update(state => ({
        ...state,
        isNavigating: false
      }));
    }, 100);
    
  } catch (error) {
    console.error('Navigation error:', error);
    // Fallback to home page
    currentPage.set(DEFAULT_PAGE);
    window.location.hash = '';
  }
}

/**
 * Get the current page from URL hash
 * @returns {string} The current page
 */
export function getCurrentPageFromHash() {
  const hash = window.location.hash.slice(1); // Remove the # symbol
  return VALID_PAGES.includes(hash) ? hash : DEFAULT_PAGE;
}

/**
 * Initialize the router
 */
export function initializeRouter() {
  // Set initial page based on URL hash
  const initialPage = getCurrentPageFromHash();
  currentPage.set(initialPage);
  
  // Listen for hash changes
  const handleHashChange = () => {
    const newPage = getCurrentPageFromHash();
    navigateTo(newPage, false); // Don't update history since it's already changed
  };
  
  window.addEventListener('hashchange', handleHashChange);
  
  // Listen for browser back/forward buttons
  const handlePopState = (event) => {
    const newPage = getCurrentPageFromHash();
    navigateTo(newPage, false);
  };
  
  window.addEventListener('popstate', handlePopState);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('hashchange', handleHashChange);
    window.removeEventListener('popstate', handlePopState);
  };
}

/**
 * Close mobile menu
 */
export function closeMobileMenu() {
  navigationState.update(state => ({
    ...state,
    isMenuOpen: false
  }));
}

/**
 * Toggle mobile menu
 */
export function toggleMobileMenu() {
  navigationState.update(state => ({
    ...state,
    isMenuOpen: !state.isMenuOpen
  }));
}