import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const defaultMeta = {
  title: 'Alelken',
  description: 'Alelken develops cutting-edge digital platforms that enhance human wellbeing and personal development through thoughtful technology integration.',
  image: '/assets/images/android-chrome-512x512.png',
};

const pageSpecificMeta = {
  '/': defaultMeta,
  '/product': {
    title: 'Product – Alelken',
    description: 'Discover our comprehensive wellness solutions focused on stress management, mindfulness development, community connection, and progress tracking.',
    image: '/assets/images/android-chrome-512x512.png',
  },
  '/about': {
    title: 'About – Alelken',
    description: 'Learn about Alelken’s mission, values, and the team building human-centered technology.',
    image: '/assets/images/android-chrome-512x512.png',
  },
  '/careers': {
    title: 'Careers – Alelken',
    description: 'Join our team and help build technology solutions that enhance human wellbeing and personal development.',
    image: '/assets/images/android-chrome-512x512.png',
  },
};

export default function MetaTags() {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const meta = pageSpecificMeta[currentPath] || defaultMeta;
  const siteUrl = 'https://alelken.in'; 

  useEffect(() => {
    document.title = meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', meta.description);
    
    const metaTags = {
      'twitter:card': 'summary_large_image',
      'twitter:site': '@AlelkenTech',
      'twitter:title': meta.title,
      'twitter:description': meta.description,
      'twitter:image': `${siteUrl}${meta.image}`,
    };

    const ogTags = {
      'og:title': meta.title,
      'og:description': meta.description,
      'og:image': `${siteUrl}${meta.image}`,
      'og:url': `${siteUrl}${currentPath === '/' ? '' : currentPath}`,
      'og:site_name': 'Alelken',
    }

    // Update or create meta tags
    Object.entries(metaTags).forEach(([name, content]) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.name = name;
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // Canonical link
    const canonicalHref = `${siteUrl}${currentPath === '/' ? '' : currentPath}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalHref);

    return () => {
    };
  }, [currentPath, meta.title, meta.description, meta.image]);

  return null;
}
