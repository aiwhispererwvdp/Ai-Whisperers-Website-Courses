'use client';

import { useEffect } from 'react';

export default function MobileTouchOptimizer() {
  useEffect(() => {
    // Prevent iOS zoom on form focus
    const preventIOSZoom = () => {
      const meta = document.querySelector('meta[name="viewport"]');
      if (meta) {
        meta.setAttribute('content', 
          'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
        );
      }
    };

    // Optimize touch interactions
    const optimizeTouchTargets = () => {
      // Find all interactive elements that might be too small
      const interactiveElements = document.querySelectorAll(
        'button, a, input, textarea, select, [role="button"], [tabindex="0"]'
      );

      interactiveElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.height < 44 || rect.width < 44) {
          (element as HTMLElement).style.minHeight = '44px';
          (element as HTMLElement).style.minWidth = '44px';
          (element as HTMLElement).style.display = 'flex';
          (element as HTMLElement).style.alignItems = 'center';
          (element as HTMLElement).style.justifyContent = 'center';
        }
      });
    };

    // Add touch feedback for mobile devices
    const addTouchFeedback = () => {
      if ('ontouchstart' in window) {
        document.addEventListener('touchstart', (e) => {
          const target = e.target as HTMLElement;
          if (target.matches('button, [role="button"], a')) {
            target.style.transform = 'scale(0.98)';
            target.style.transition = 'transform 0.1s ease';
          }
        });

        document.addEventListener('touchend', (e) => {
          const target = e.target as HTMLElement;
          if (target.matches('button, [role="button"], a')) {
            setTimeout(() => {
              target.style.transform = 'scale(1)';
            }, 100);
          }
        });
      }
    };

    // Improve mobile scrolling performance
    const optimizeScrolling = () => {
      const scrollElements = document.querySelectorAll('.overflow-auto, .overflow-scroll');
      scrollElements.forEach((element) => {
        (element as HTMLElement).style.WebkitOverflowScrolling = 'touch';
      });
    };

    // Initialize optimizations
    preventIOSZoom();
    optimizeTouchTargets();
    addTouchFeedback();
    optimizeScrolling();

    // Re-optimize when content changes
    const observer = new MutationObserver(() => {
      optimizeTouchTargets();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}