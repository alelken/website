import React, { useState, useEffect, useRef, useCallback } from 'react';

const CardCarousel = ({ items, cardComponent, className = '' }) => {
  const CardComponent = cardComponent;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const scrollTimeout = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Check if we're on mobile
  const checkIfMobile = useCallback(() => {
    const mobile = window.innerWidth < 1024;
    setIsMobile(mobile);
    return mobile;
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const wasMobile = isMobile;
      const nowMobile = checkIfMobile();
      
      // If we switched between mobile and desktop, reset the container
      if (wasMobile !== nowMobile && containerRef.current) {
        containerRef.current.scrollLeft = 0;
        setActiveIndex(0);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [checkIfMobile, isMobile]);

  // Scroll to specific card index
  const scrollToIndex = useCallback((index) => {
    const container = containerRef.current;
    if (!container || index < 0 || index >= items.length) return;

    const card = itemRefs.current[index];
    if (!card) return;

    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const scrollLeft = container.scrollLeft;
    const cardLeft = cardRect.left - containerRect.left + scrollLeft;
    const cardWidth = cardRect.width;
    const scrollPosition = cardLeft - (containerRect.width / 2) + (cardWidth / 2);

    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });

    setActiveIndex(index);
  }, [items.length]);

  // Handle scroll events to update active dot
  const handleScroll = useCallback(() => {
    if (!isMobile || !containerRef.current) return;
    
    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + (containerRect.width / 2);
      
      let closestCard = null;
      let minDistance = Infinity;
      
      itemRefs.current.forEach((card, index) => {
        if (!card) return;
        
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + (cardRect.width / 2);
        const distance = Math.abs(cardCenter - containerCenter);
        
        // Update active state for visual feedback
        card.setAttribute('data-snap-active', distance < 100 ? 'true' : 'false');
        
        if (distance < minDistance) {
          minDistance = distance;
          closestCard = index;
        }
      });
      
      if (closestCard !== null && closestCard !== activeIndex) {
        setActiveIndex(closestCard);
      }
    }, 150); // Slight debounce for better performance
  }, [activeIndex, isMobile]);
  
  // Set up event listeners and initial state
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Initialize item refs
    itemRefs.current = itemRefs.current.slice(0, items.length);
    
    // Set initial active state
    const updateActiveStates = () => {
      if (!isMobile) return;
      
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + (containerRect.width / 2);
      
      itemRefs.current.forEach(card => {
        if (!card) return;

        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + (cardRect.width / 2);
        const distance = Math.abs(cardCenter - containerCenter);

        card.setAttribute('data-snap-active', distance < 100 ? 'true' : 'false');
      });
    };
    
    // Initial update
    updateActiveStates();
    
    // Set up scroll listener
    container.addEventListener('scroll', handleScroll, { passive: true });
    
    // Clean up
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout.current);
    };
  }, [handleScroll, isMobile, items.length]);

  // Touch event handlers for mobile
  const handleTouchStart = (e) => {
    if (!isMobile) return;
    isDragging.current = true;
    startX.current = e.touches[0].pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
    containerRef.style.scrollSnapType = 'none';
    containerRef.style.scrollBehavior = 'auto';
  };

  const handleTouchMove = (e) => {
    if (!isMobile || !isDragging.current) return;
    e.preventDefault();
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = x - startX.current;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;
    isDragging.current = false;
    containerRef.style.scrollSnapType = 'x mandatory';
    containerRef.style.scrollBehavior = 'smooth';
    
    // Snap to nearest card after drag ends
    const container = containerRef.current;
    const scrollPosition = container.scrollLeft + (container.offsetWidth / 2);
    
    let closestCard = null;
    let minDistance = Infinity;
    
    itemRefs.current.forEach((card, index) => {
      if (!card) return;
      
      const cardRect = card.getBoundingClientRect();
      const cardLeft = cardRect.left + container.scrollLeft - container.getBoundingClientRect().left;
      const cardCenter = cardLeft + (cardRect.width / 2);
      const distance = Math.abs(cardCenter - scrollPosition);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestCard = index;
      }
    });
    
    if (closestCard !== null) {
      scrollToIndex(closestCard);
    }
  };

  // Mouse event handlers for desktop (fallback)
  const handleMouseDown = (e) => {
    if (isMobile) return;
    isDragging.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
    containerRef.current.style.cursor = 'grabbing';
    containerRef.current.style.userSelect = 'none';
    containerRef.current.style.scrollSnapType = 'none';
    containerRef.current.style.scrollBehavior = 'auto';
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
      containerRef.current.style.removeProperty('user-select');
      containerRef.current.style.scrollSnapType = 'x mandatory';
      containerRef.current.style.scrollBehavior = 'smooth';
    }
  };

  const handleMouseUp = () => {
    if (isDragging.current) {
      isDragging.current = false;
      
      if (containerRef.current) {
        containerRef.current.style.cursor = 'grab';
        containerRef.current.style.removeProperty('user-select');
        containerRef.current.style.scrollSnapType = 'x mandatory';
        containerRef.current.style.scrollBehavior = 'smooth';
        
        // Snap to nearest card after drag ends
        const container = containerRef.current;
        const scrollPosition = container.scrollLeft + (container.offsetWidth / 2);
        
        let closestCard = null;
        let minDistance = Infinity;
        
        itemRefs.current.forEach((card, index) => {
          if (!card) return;
          
          const cardRect = card.getBoundingClientRect();
          const cardLeft = cardRect.left + container.scrollLeft - container.getBoundingClientRect().left;
          const cardCenter = cardLeft + (cardRect.width / 2);
          const distance = Math.abs(cardCenter - scrollPosition);
          
          if (distance < minDistance) {
            minDistance = distance;
            closestCard = index;
          }
        });
        
        if (closestCard !== null) {
          scrollToIndex(closestCard);
        }
      }
    }
  };

  const handleMouseMove = (e) => {
    if (isMobile || !isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = x - startX.current;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className={`card-carousel-container ${className}`}>
      <div
        ref={containerRef}
        className="card-carousel"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{
          cursor: isMobile ? (isDragging.current ? 'grabbing' : 'grab') : 'grab',
          userSelect: isDragging.current ? 'none' : 'auto',
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          scrollSnapType: isMobile ? 'x mandatory' : 'none',
          scrollBehavior: 'smooth',
          overscrollBehaviorX: 'contain',
          flexWrap: 'nowrap'
        }}
      >
        {items.map((item, index) => (
          <div 
            key={index} 
            ref={el => itemRefs.current[index] = el}
            className="card-carousel-item"
            data-snap-active={index === activeIndex ? 'true' : 'false'}
          >
            <CardComponent {...item} />
          </div>
        ))}
      </div>
      
      {isMobile && items.length > 1 && (
        <div className="card-carousel-dots">
          {items.map((_, index) => (
            <button
              key={index}
              className={`card-carousel-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => scrollToIndex(index)}
              onKeyDown={(e) => e.key === 'Enter' && scrollToIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeIndex ? 'true' : 'false'}
              tabIndex={0}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardCarousel;
