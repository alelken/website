import React, { useState, useEffect, useRef, useCallback } from 'react';

const CardCarousel = ({ items, cardComponent: CardComponent, className = '' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showDots, setShowDots] = useState(false);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Check if we should show dots based on container width
  const checkShowDots = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const shouldShowDots = container.scrollWidth > container.clientWidth;
    setShowDots(shouldShowDots);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      checkShowDots();
      // Re-center the active card after resize
      if (activeIndex >= 0 && activeIndex < items.length) {
        scrollToIndex(activeIndex);
      }
    };

    window.addEventListener('resize', handleResize);
    checkShowDots();
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIndex, checkShowDots, items.length]);

  // Scroll to specific card index
  const scrollToIndex = (index) => {
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
  };

  // Handle scroll events to update active dot
  const handleScroll = useCallback(() => {
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
  }, [activeIndex]);
  
  // Initial centering of first card
  useEffect(() => {
    if (containerRef.current && items.length > 0) {
      // Small timeout to ensure DOM is ready
      const timer = setTimeout(() => {
        scrollToIndex(0);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [items.length]);

  // Add scroll event listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Touch and drag handlers
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Adjust scroll speed
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className={`card-carousel-container ${className}`}>
      <div 
        ref={containerRef}
        className="card-carousel"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {items.map((item, index) => (
          <div key={index} className="card-carousel-item">
            <CardComponent {...item} />
          </div>
        ))}
      </div>
      
      {showDots && items.length > 1 && (
        <div className="card-carousel-dots">
          {items.map((_, index) => (
            <button
              key={index}
              className={`card-carousel-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to card ${index + 1} of ${items.length}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardCarousel;
