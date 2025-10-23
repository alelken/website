/**
 * Utilities for completely disabling caching at all levels
 */

/**
 * Add no-cache meta tags to document head
 * This prevents browser from caching the HTML page itself
 */
export function addNoCacheHeaders() {
    if (typeof document === 'undefined') return;

    const metaTags = [
        { httpEquiv: 'Cache-Control', content: 'no-cache, no-store, must-revalidate' },
        { httpEquiv: 'Pragma', content: 'no-cache' },
        { httpEquiv: 'Expires', content: '0' },
        { name: 'cache-control', content: 'no-cache' },
        { name: 'expires', content: '0' },
        { name: 'pragma', content: 'no-cache' }
    ];

    metaTags.forEach(tag => {
        const meta = document.createElement('meta');
        if (tag.httpEquiv) meta.httpEquiv = tag.httpEquiv;
        if (tag.name) meta.name = tag.name;
        meta.content = tag.content;
        document.head.appendChild(meta);
    });
}

/**
 * Override browser caching mechanisms
 * This disables various browser caching features
 */
export function disableBrowserCaching() {
    if (typeof window === 'undefined') return;

    // Disable back/forward cache
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            window.location.reload();
        }
    });

    // Disable browser cache for navigation
    window.addEventListener('beforeunload', () => {
        // Force browser to not cache the page
        window.onbeforeunload = null;
    });

    // Override history navigation to force reload
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
        originalPushState.apply(history, args);
        // Add timestamp to prevent caching
        const url = new URL(window.location.href);
        url.searchParams.set('_t', Date.now().toString());
        originalReplaceState.call(history, args[0], args[1], url.toString());
    };

    history.replaceState = function (...args) {
        originalReplaceState.apply(history, args);
        // Add timestamp to prevent caching
        const url = new URL(window.location.href);
        url.searchParams.set('_t', Date.now().toString());
        originalReplaceState.call(history, args[0], args[1], url.toString());
    };
}

/**
 * Clear all possible browser storage and caches
 */
export function clearAllStorage() {
    if (typeof window === 'undefined') return;

    try {
        // Clear localStorage
        localStorage.clear();

        // Clear sessionStorage
        sessionStorage.clear();

        // Clear IndexedDB (if available)
        if ('indexedDB' in window && indexedDB.databases) {
            indexedDB.databases().then(databases => {
                databases.forEach(db => {
                    if (db.name) {
                        indexedDB.deleteDatabase(db.name);
                    }
                });
            }).catch(() => {
                // Ignore errors
            });
        }

        // Clear Web SQL (deprecated but still might exist)
        if ('openDatabase' in window && typeof window.openDatabase === 'function') {
            try {
                const db = window.openDatabase('', '', '', '');
                if (db && typeof db.transaction === 'function') {
                    db.transaction(tx => {
                        tx.executeSql('DROP TABLE IF EXISTS cache');
                    });
                }
            } catch (e) {
                // Ignore errors
            }
        }

        // Clear Cache API
        if ('caches' in window) {
            caches.keys().then(names => {
                names.forEach(name => {
                    caches.delete(name);
                });
            });
        }
    } catch (error) {
        console.warn('Could not clear all storage:', error);
    }
}

/**
 * Set up complete no-cache environment
 * Call this early in app initialization
 */
export function setupNoCacheEnvironment() {
    addNoCacheHeaders();
    disableBrowserCaching();
    clearAllStorage();

    // Clear storage periodically
    const clearInterval = setInterval(clearAllStorage, 10000);

    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        if (typeof clearInterval === 'number') {
            window.clearInterval(clearInterval);
        }
        clearAllStorage();
    });

    return clearInterval;
}