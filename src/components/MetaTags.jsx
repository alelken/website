import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const defaultMeta = {
  title: 'Home | Alelken',
  description: 'Alelken develops cutting-edge digital platforms that enhance human wellbeing and personal development through thoughtful technology integration.',
  image: '/assets/images/android-chrome-512x512.png',
};

const pageSpecificMeta = {
  '/': defaultMeta,
  '/product': {
    title: 'Product | Alelken',
    description: 'Discover our comprehensive wellness solutions focused on stress management, mindfulness development, community connection, and progress tracking.',
    image: '/assets/images/android-chrome-512x512.png',
  },
  '/careers': {
    title: 'Careers | Alelken',
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
    document.querySelector('meta[name="description"]').setAttribute('content', meta.description);
    
    const metaTags = {
      'twitter:card': 'summary_large_image',
      'twitter:site': '@AlelkenTech',
      'twitter:title': meta.title,
      'twitter:description': meta.description,
      'twitter:image': `${siteUrl}${meta.image}`,
    };

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

    return () => {
    };
  }, [currentPath]);

  return null;
}
