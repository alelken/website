import { writable, derived } from 'svelte/store';

// Valid pages for the application
const VALID_PAGES = ['home', 'product', 'press', 'about'];
const DEFAULT_PAGE = 'home';
const NOT_FOUND_PAGE = 'not-found';

// Core stores - declared first to avoid initialization issues
export const currentPage = writable(DEFAULT_PAGE);
export const routeParams = writable({});
export const navigationState = writable({
  isMenuOpen: false,
  previousPage: null,
  isNavigating: false
});

// Derived stores - declared after core stores
export const pageMetadata = derived([currentPage, routeParams], ([$currentPage, $routeParams]) => {
  const metadata = {
    home: {
      title: 'Home | Alelken',
      description: 'Building systems that heal, educate, and sustain through innovative technology solutions.',
      path: '/'
    },
    product: {
      title: 'Product | Alelken',
      description: 'Discover Alayn, our mental wellness platform designed specifically for India\'s unique cultural context.',
      path: '/product'
    },
    press: {
      title: 'Press | Alelken',
      description: 'Latest news and announcements from Alelken.',
      path: '/press'
    },
    about: {
      title: 'About | Alelken',
      description: 'Meet the team behind Alelken and learn about our mission to build technology for human potential.',
      path: '/about'
    },
    'press-detail': {
      title: ($routeParams && typeof $routeParams === 'object' && 'title' in $routeParams && $routeParams.title) ? `${$routeParams.title} | Alelken` : 'Press Release | Alelken',
      description: ($routeParams && typeof $routeParams === 'object' && 'excerpt' in $routeParams && $routeParams.excerpt) || 'Read our latest press release.',
      path: `/press/${($routeParams && typeof $routeParams === 'object' && 'uid' in $routeParams && $routeParams.uid) || ''}`
    },
    'not-found': {
      title: '404 - Page Not Found | Alelken',
      description: 'The page you\'re looking for doesn\'t exist. Explore our technology solutions for human potential.',
      path: '/404'
    }
  };

  return metadata[$currentPage] || metadata[DEFAULT_PAGE];
});

export const breadcrumbs = derived([currentPage, routeParams], ([$currentPage, $routeParams]) => {
  const crumbs = [
    { label: 'Home', page: 'home', url: '#' }
  ];

  try {
    if ($currentPage === 'press') {
      crumbs.push({ label: 'Press Releases', page: 'press', url: '#press' });
    } else if ($currentPage === 'press-detail') {
      crumbs.push({ label: 'Press Releases', page: 'press', url: '#press' });
      if ($routeParams && typeof $routeParams === 'object' && 'title' in $routeParams && $routeParams.title) {
        crumbs.push({ 
          label: String($routeParams.title), 
          page: 'press-detail', 
          url: `#press/${('uid' in $routeParams && $routeParams.uid) || ''}`,
          current: true 
        });
      }
    } else if ($currentPage !== 'home') {
      const pageLabels = {
        product: 'Product',
        about: 'About'
      };
      crumbs.push({ 
        label: pageLabels[$currentPage] || $currentPage, 
        page: $currentPage, 
        url: `#${$currentPage}`,
        current: true 
      });
    }
  } catch (error) {
    console.warn('Error generating breadcrumbs:', error);
  }

  return crumbs;
});

/**
 * Get the current page from URL hash
 * @returns {Object} The current page and params
 */
export function getCurrentPageFromHash() {
  const hash = window.location.hash.slice(1); // Remove the # symbol

  if (!hash) {
    return { page: DEFAULT_PAGE, params: {} };
  }

  // Handle dynamic routes like press/blog-post-slug
  const parts = hash.split('/').filter(part => part.length > 0);
  const page = parts[0];

  if (page === 'press' && parts.length === 2) {
    const uid = parts[1];
    // Validate UID format (basic validation)
    if (uid && uid.length > 0 && /^[a-zA-Z0-9-_]+$/.test(uid)) {
      return {
        page: 'press-detail',
        params: { uid }
      };
    } else {
      // Invalid UID format, redirect to press list
      return { page: 'press', params: {} };
    }
  }

  return {
    page: VALID_PAGES.includes(page) ? page : NOT_FOUND_PAGE,
    params: {}
  };
}

/**
 * Navigate to a specific page
 * @param {string} page - The page to navigate to
 * @param {Object} params - Route parameters
 * @param {boolean} updateHistory - Whether to update browser history
 */
export function navigateTo(page, params = {}, updateHistory = true) {
  try {
    // Handle dynamic routes
    const allValidPages = [...VALID_PAGES, 'press-detail', NOT_FOUND_PAGE];

    // Validate the page
    if (!allValidPages.includes(page)) {
      console.warn(`Invalid page: ${page}. Showing 404 page`);
      page = NOT_FOUND_PAGE;
      params = {};
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

    // Update the current page and params
    currentPage.set(page);
    routeParams.set(params);

    // Update browser history and URL hash
    if (updateHistory) {
      let newHash = '';
      if (page === 'press-detail' && params.uid) {
        newHash = `#press/${params.uid}`;
      } else if (page !== DEFAULT_PAGE) {
        newHash = `#${page}`;
      }

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
    routeParams.set({});
    window.location.hash = '';
  }
}

/**
 * Initialize the router
 */
export function initializeRouter() {
  // Check for SSG initial state
  if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
    const { currentPage: initialPage, routeParams: initialParams } = window.__INITIAL_STATE__;
    currentPage.set(initialPage);
    routeParams.set(initialParams);
    console.log('Router initialized with SSG state:', { initialPage, initialParams });
  } else {
    // Ensure stores are properly initialized
    if (typeof window !== 'undefined') {
      console.log('Router initializing with current page:', getCurrentPageFromHash());
    }
    
    // Set initial page based on URL hash
    const { page: initialPage, params: initialParams } = getCurrentPageFromHash();
    currentPage.set(initialPage);
    routeParams.set(initialParams);
  }

  // Listen for hash changes
  const handleHashChange = () => {
    const { page, params } = getCurrentPageFromHash();
    navigateTo(page, params, false); // Don't update history since it's already changed
  };

  window.addEventListener('hashchange', handleHashChange);

  // Listen for browser back/forward buttons
  const handlePopState = () => {
    const { page, params } = getCurrentPageFromHash();
    navigateTo(page, params, false);
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

/**
 * Generate a navigation URL for a given page and parameters
 * @param {string} page - The page to navigate to
 * @param {Object} params - Route parameters
 * @returns {string} The hash-based URL
 */
export function generateUrl(page, params = {}) {
  if (page === 'press-detail' && params.uid) {
    return `#press/${params.uid}`;
  } else if (page === DEFAULT_PAGE) {
    return '#';
  } else {
    return `#${page}`;
  }
}

/**
 * Navigate to a press detail page
 * @param {string} uid - The blog post UID/slug
 */
export function navigateToPress(uid) {
  navigateTo('press-detail', { uid });
}

/**
 * Navigate to the press list page
 */
export function navigateToPressList() {
  navigateTo('press');
}

/**
 * Navigate to the home page
 */
export function navigateToHome() {
  navigateTo('home');
}

/**
 * Check if the current route is valid
 * @returns {boolean} Whether the current route is valid
 */
export function isValidRoute() {
  const { page } = getCurrentPageFromHash();
  const allValidPages = [...VALID_PAGES, 'press-detail', NOT_FOUND_PAGE];
  return allValidPages.includes(page);
}

/**
 * Get the current route information
 * @returns {Object} Current route info
 */
export function getCurrentRoute() {
  return getCurrentPageFromHash();
}