import React, { useState, useEffect, useRef, useCallback } from 'react';

const CardCarousel = ({ items, cardComponent: CardComponent, className = '' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Check if we're on mobile
  const checkIfMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  // Handle window resize
  useEffect(() => {
    checkIfMobile();
    
    const handleResize = () => {
      checkIfMobile();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [checkIfMobile]);

  // Scroll to specific card index (for mobile carousel)
  const scrollToIndex = useCallback((index) => {
    if (!isMobile) return;
    
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(container.children).filter(
      child => child.classList && child.classList.contains('card-carousel-item')
    );

    if (cards[index]) {
      const containerWidth = container.offsetWidth;
      const card = cards[index];
      const cardRect = card.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const containerScrollLeft = container.scrollLeft;
      const cardLeft = cardRect.left - containerRect.left + containerScrollLeft;
      const scrollPosition = cardLeft - (containerWidth / 2) + (cardRect.width / 2);

      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });

      setActiveIndex(index);
    }
  }, [isMobile]);

  // Handle scroll events to update active dot (for mobile)
  const handleScroll = useCallback(() => {
    if (!isMobile) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    const cards = Array.from(container.children).filter(
      child => child.classList && child.classList.contains('card-carousel-item')
    );

    if (cards.length === 0) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + (containerRect.width / 2);
    
    let closestCard = null;
    let minDistance = Infinity;
    
    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + (cardRect.width / 2);
      const distance = Math.abs(cardCenter - containerCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestCard = index;
      }
    });
    
    if (closestCard !== null && closestCard !== activeIndex) {
      setActiveIndex(closestCard);
    }
  }, [activeIndex, isMobile]);
  
  // Add/remove event listeners based on mobile state
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    if (isMobile) {
      // Only add scroll listener, don't auto-scroll to first card on mount
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
    
    // For desktop, ensure we have the grid layout
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, isMobile]);

  // Touch event handlers for mobile
  const handleTouchStart = (e) => {
    if (!isMobile) return;
    isDragging.current = true;
    startX.current = e.touches[0].pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!isMobile || !isDragging.current) return;
    e.preventDefault();
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  // Mouse event handlers for desktop (fallback)
  const handleMouseDown = (e) => {
    if (isMobile) return;
    isDragging.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
    containerRef.current.style.cursor = 'grabbing';
    containerRef.current.style.userSelect = 'none';
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
      containerRef.current.style.removeProperty('user-select');
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
      containerRef.current.style.removeProperty('user-select');
    }
  };

  const handleMouseMove = (e) => {
    if (isMobile || !isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className={`card-carousel-container ${className}`}>
      <div
        ref={containerRef}
        className="card-carousel"
        onTouchStart={isMobile ? handleTouchStart : undefined}
        onTouchMove={isMobile ? handleTouchMove : undefined}
        onTouchEnd={isMobile ? handleTouchEnd : undefined}
        onMouseDown={isMobile ? undefined : handleMouseDown}
        onMouseLeave={isMobile ? undefined : handleMouseLeave}
        onMouseUp={isMobile ? undefined : handleMouseUp}
        onMouseMove={isMobile ? undefined : handleMouseMove}
        style={{
          cursor: isMobile ? (isDragging.current ? 'grabbing' : 'grab') : 'default',
          userSelect: isMobile && isDragging.current ? 'none' : 'auto'
        }}
      >
        {items.map((item, index) => (
          <div key={index} className="card-carousel-item">
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
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardCarousel;
