export interface A11yConfig {
  enableFocusManagement: boolean;
  enableScreenReaderAnnouncements: boolean;
  enableKeyboardNavigation: boolean;
  enableHighContrast: boolean;
}

export const defaultA11yConfig: A11yConfig = {
  enableFocusManagement: true,
  enableScreenReaderAnnouncements: true,
  enableKeyboardNavigation: true,
  enableHighContrast: false,
};

export function createSkipLink() {
  if (typeof document === 'undefined') return;

  const existingSkipLink = document.getElementById('skip-to-content');
  if (existingSkipLink) return;

  const skipLink = document.createElement('a');
  skipLink.id = 'skip-to-content';
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-md focus:shadow-lg';
  
  document.body.insertBefore(skipLink, document.body.firstChild);
}

export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  if (typeof document === 'undefined') return;

  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

export function trapFocus(element: HTMLElement) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstFocusableElement = focusableElements[0] as HTMLElement;
  const lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  function handleTabKey(e: KeyboardEvent) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    }
    
    if (e.key === 'Escape') {
      element.dispatchEvent(new CustomEvent('close'));
    }
  }

  element.addEventListener('keydown', handleTabKey);
  
  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
}

export function getContrastRatio(color1: string, color2: string): number {
  function getLuminance(color: string): number {
    const rgb = color.match(/\d+/g);
    if (!rgb) return 0;
    
    const [r, g, b] = rgb.map(c => {
      const val = parseInt(c) / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

export function validateAccessibility(element: HTMLElement): {
  valid: boolean;
  issues: string[];
  suggestions: string[];
} {
  const issues: string[] = [];
  const suggestions: string[] = [];

  const images = element.querySelectorAll('img');
  images.forEach(img => {
    if (!img.alt && !img.getAttribute('aria-hidden')) {
      issues.push(`Image missing alt text: ${img.src}`);
      suggestions.push('Add descriptive alt text or aria-hidden="true" for decorative images');
    }
  });

  const buttons = element.querySelectorAll('button');
  buttons.forEach(button => {
    if (!button.textContent?.trim() && !button.getAttribute('aria-label')) {
      issues.push('Button missing accessible text');
      suggestions.push('Add aria-label or visible text to buttons');
    }
  });

  const links = element.querySelectorAll('a');
  links.forEach(link => {
    if (!link.textContent?.trim() && !link.getAttribute('aria-label')) {
      issues.push(`Link missing accessible text: ${link.href}`);
      suggestions.push('Add descriptive link text or aria-label');
    }
  });

  const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
  if (headings.length === 0) {
    issues.push('No heading structure found');
    suggestions.push('Add proper heading hierarchy for screen readers');
  }

  return {
    valid: issues.length === 0,
    issues,
    suggestions
  };
}

export const responsiveBreakpoints = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export function createResponsiveClasses(config: {
  base: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
}): string {
  return [
    config.base,
    config.sm && `sm:${config.sm}`,
    config.md && `md:${config.md}`,
    config.lg && `lg:${config.lg}`,
    config.xl && `xl:${config.xl}`,
    config['2xl'] && `2xl:${config['2xl']}`,
  ].filter(Boolean).join(' ');
}