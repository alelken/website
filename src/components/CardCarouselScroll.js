// Adds scroll snap centering and dot hinting for card carousels
import { useEffect } from 'react';

export default function useCardCarouselScroll(carouselId, dotsId) {
  useEffect(() => {
    const carousel = document.getElementById(carouselId);
    const dots = document.getElementById(dotsId);
    if (!carousel || !dots) return;
    const cards = Array.from(carousel.querySelectorAll('.feature-card'));
    // Create dots
    dots.innerHTML = '';
    cards.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'scroll-dot';
      if (i === 0) dot.classList.add('active');
      dots.appendChild(dot);
    });
    // Center card on scroll end
    let scrollTimeout;
    function onScroll() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const cardRects = cards.map(card => card.getBoundingClientRect());
        const carouselRect = carousel.getBoundingClientRect();
        const center = carouselRect.left + carouselRect.width / 2;
        let minDist = Infinity, minIdx = 0;
        cardRects.forEach((rect, i) => {
          const cardCenter = rect.left + rect.width / 2;
          const dist = Math.abs(center - cardCenter);
          if (dist < minDist) {
            minDist = dist;
            minIdx = i;
          }
        });
        // Snap to closest card
        cards[minIdx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        // Update dots
        dots.querySelectorAll('.scroll-dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === minIdx);
        });
      }, 80);
    }
    carousel.addEventListener('scroll', onScroll);
    // Dot click
    dots.querySelectorAll('.scroll-dot').forEach((dot, i) => {
      dot.onclick = () => {
        cards[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      };
    });
    return () => {
      carousel.removeEventListener('scroll', onScroll);
    };
  }, [carouselId, dotsId]);
}
