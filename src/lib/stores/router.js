import { writable, derived } from 'svelte/store';

// Valid pages for the application
const VALID_PAGES = ['home', 'product', 'press', 'about'];
const DEFAULT_PAGE = 'home';

// Store for current route parameters
export const routeParams = writable({});

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
      title: 'Press & Media | Alelken',
      description: 'Latest news, press releases, and media resources from Alelken.',
      path: '/press'
    },
    about: {
      title: 'About Us | Alelken',
      description: 'Meet the team behind Alelken and learn about our mission to build technology for human potential.',
      path: '/about'
    },
    'press-detail': {
      title: 'Blog Post | Alelken',
      description: 'Read our latest blog post and insights.',
      path: '/press'
    }
  };

  return metadata[$currentPage] || metadata[DEFAULT_PAGE];
});

/**
 * Navigate to a specific page
 * @param {string} page - The page to navigate to
 * @param {Object} params - Route parameters
 * @param {boolean} updateHistory - Whether to update browser history
 */
export function navigateTo(page, params = {}, updateHistory = true) {
  try {
    // Handle dynamic routes
    const allValidPages = [...VALID_PAGES, 'press-detail'];

    // Validate the page
    if (!allValidPages.includes(page)) {
      console.warn(`Invalid page: ${page}. Redirecting to ${DEFAULT_PAGE}`);
      page = DEFAULT_PAGE;
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
 * Get the current page from URL hash
 * @returns {Object} The current page and params
 */
export function getCurrentPageFromHash() {
  const hash = window.location.hash.slice(1); // Remove the # symbol

  if (!hash) {
    return { page: DEFAULT_PAGE, params: {} };
  }

  // Handle dynamic routes like press/blog-post-slug
  const parts = hash.split('/');
  const page = parts[0];

  if (page === 'press' && parts.length === 2) {
    return {
      page: 'press-detail',
      params: { uid: parts[1] }
    };
  }

  return {
    page: VALID_PAGES.includes(page) ? page : DEFAULT_PAGE,
    params: {}
  };
}

/**
 * Initialize the router
 */
export function initializeRouter() {
  // Set initial page based on URL hash
  const { page: initialPage, params: initialParams } = getCurrentPageFromHash();
  currentPage.set(initialPage);
  routeParams.set(initialParams);

  // Listen for hash changes
  const handleHashChange = () => {
    const { page, params } = getCurrentPageFromHash();
    navigateTo(page, params, false); // Don't update history since it's already changed
  };

  window.addEventListener('hashchange', handleHashChange);

  // Listen for browser back/forward buttons
  const handlePopState = (event) => {
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