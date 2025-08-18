import { useEffect } from 'react';

/**
 * Ensures the application always uses light theme
 * by setting appropriate meta tags and styles
 */
const useForceLightMode = () => {
  useEffect(() => {
    // Set meta tag for color scheme
    let meta = document.querySelector('meta[name="color-scheme"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'color-scheme';
      meta.content = 'light';
      document.head.appendChild(meta);
    } else {
      meta.content = 'light';
    }

    // Set theme color for mobile browsers
    let themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) {
      themeColor = document.createElement('meta');
      themeColor.name = 'theme-color';
      themeColor.content = '#ffffff';
      document.head.appendChild(themeColor);
    } else {
      themeColor.content = '#ffffff';
    }

    // Ensure light theme is applied to the root
    document.documentElement.style.setProperty('color-scheme', 'light');
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');

    // Set background colors
    document.documentElement.style.backgroundColor = '#ffffff';
    document.body.style.backgroundColor = '#ffffff';
    // 4. Force light color scheme
    document.documentElement.style.colorScheme = 'light';
    document.body.style.colorScheme = 'light';

    // 5. Set data attributes for theme
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.classList.add('light-theme');
    document.documentElement.classList.remove('dark', 'dark-theme');

    // 6. Cleanup function
    return () => {
      const styleElement = document.getElementById('force-light-mode');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, []);
};

export default useForceLightMode;
