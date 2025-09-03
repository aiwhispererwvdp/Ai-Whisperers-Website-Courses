'use client';

import { useEffect, ReactNode } from 'react';

interface A11yProviderProps {
  children: ReactNode;
}

export default function A11yProvider({ children }: A11yProviderProps) {
  useEffect(() => {
    // Announce page changes to screen readers
    const announcePageChange = (title: string) => {
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = `Page loaded: ${title}`;
      
      document.body.appendChild(announcement);
      
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    };

    // Add keyboard navigation support
    const handleKeyboardNavigation = (e: KeyboardEvent) => {
      // Escape key to close modals/dropdowns
      if (e.key === 'Escape') {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement?.closest('[role="dialog"], [role="menu"]')) {
          const closeButton = document.querySelector('[aria-label*="Close"], [aria-label*="close"]') as HTMLElement;
          closeButton?.click();
        }
      }

      // Tab trap for modals
      if (e.key === 'Tab') {
        const modal = document.querySelector('[role="dialog"]');
        if (modal) {
          const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    // Add focus management for dynamic content
    const manageFocusForDynamicContent = () => {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as Element;
                
                // Auto-focus first interactive element in new content
                const firstInteractive = element.querySelector(
                  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                ) as HTMLElement;
                
                if (firstInteractive && element.getAttribute('data-auto-focus') === 'true') {
                  setTimeout(() => firstInteractive.focus(), 100);
                }

                // Add ARIA labels to elements missing them
                const interactiveElements = element.querySelectorAll('button, [role="button"]');
                interactiveElements.forEach((el) => {
                  if (!el.getAttribute('aria-label') && !el.getAttribute('aria-labelledby')) {
                    const text = el.textContent?.trim();
                    if (text) {
                      el.setAttribute('aria-label', text);
                    }
                  }
                });
              }
            });
          }
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      return () => observer.disconnect();
    };

    // Initialize accessibility features
    document.addEventListener('keydown', handleKeyboardNavigation);
    const disconnectObserver = manageFocusForDynamicContent();

    // Announce initial page load
    announcePageChange(document.title);

    // Add high contrast mode detection
    const handleContrastChange = () => {
      if (window.matchMedia('(prefers-contrast: high)').matches) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
    };

    const contrastMedia = window.matchMedia('(prefers-contrast: high)');
    handleContrastChange();
    contrastMedia.addEventListener('change', handleContrastChange);

    // Add reduced motion detection  
    const handleMotionChange = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.classList.add('reduce-motion');
      } else {
        document.documentElement.classList.remove('reduce-motion');
      }
    };

    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    handleMotionChange();
    motionMedia.addEventListener('change', handleMotionChange);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyboardNavigation);
      disconnectObserver();
      contrastMedia.removeEventListener('change', handleContrastChange);
      motionMedia.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return <>{children}</>;
}