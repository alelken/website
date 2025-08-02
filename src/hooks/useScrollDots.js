import { useEffect, useState, useCallback } from 'react';

export const useScrollDots = (containerRef, itemCount) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveDot = useCallback(() => {
    if (!containerRef.current || itemCount <= 1) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    const maxScroll = scrollWidth - clientWidth;
    
    // Only proceed if there's actual overflow
    if (maxScroll <= 0) return;
    
    const scrollPosition = Math.max(0, Math.min(scrollLeft, maxScroll));
    const cardWidth = scrollWidth / itemCount;
    const newIndex = Math.round(scrollPosition / cardWidth);
    
    setActiveIndex(Math.min(newIndex, itemCount - 1));
  }, [containerRef, itemCount]);

  // Handle scroll events
  useEffect(() => {
    const container = containerRef.current;
    if (!container || itemCount <= 1) return;

    container.addEventListener('scroll', updateActiveDot, { passive: true });
    window.addEventListener('resize', updateActiveDot);
    
    // Initial update
    updateActiveDot();

    return () => {
      container.removeEventListener('scroll', updateActiveDot);
      window.removeEventListener('resize', updateActiveDot);
    };
  }, [containerRef, itemCount, updateActiveDot]);

  return activeIndex;
};
