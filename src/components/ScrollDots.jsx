import React from 'react';

const ScrollDots = ({ count, activeIndex, className = '' }) => {
  if (count <= 1) return null; // Don't show dots for single item
  
  return (
    <div className={`scroll-dots ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <span 
          key={i} 
          className={`scroll-dot ${i === activeIndex ? 'active' : ''}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

export default ScrollDots;
