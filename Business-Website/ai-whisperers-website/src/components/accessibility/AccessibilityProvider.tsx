'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { announceToScreenReader, trapFocus, defaultA11yConfig, A11yConfig } from '@/lib/accessibility';

interface AccessibilityContextType {
  config: A11yConfig;
  updateConfig: (newConfig: Partial<A11yConfig>) => void;
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
  focusTrap: (element: HTMLElement) => () => void;
  isHighContrast: boolean;
  toggleHighContrast: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
}

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export default function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  const [config, setConfig] = useState<A11yConfig>(defaultA11yConfig);
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedConfig = localStorage.getItem('a11y-config');
      if (savedConfig) {
        setConfig(JSON.parse(savedConfig));
      }
      
      const savedHighContrast = localStorage.getItem('high-contrast') === 'true';
      setIsHighContrast(savedHighContrast);
      
      if (savedHighContrast) {
        document.documentElement.classList.add('high-contrast');
      }
    }
  }, []);

  const updateConfig = (newConfig: Partial<A11yConfig>) => {
    const updated = { ...config, ...newConfig };
    setConfig(updated);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('a11y-config', JSON.stringify(updated));
    }
  };

  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (config.enableScreenReaderAnnouncements) {
      announceToScreenReader(message, priority);
    }
  };

  const focusTrap = (element: HTMLElement) => {
    if (config.enableFocusManagement) {
      return trapFocus(element);
    }
    return () => {};
  };

  const toggleHighContrast = () => {
    const newValue = !isHighContrast;
    setIsHighContrast(newValue);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('high-contrast', newValue.toString());
      
      if (newValue) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
    }
  };

  const value: AccessibilityContextType = {
    config,
    updateConfig,
    announce,
    focusTrap,
    isHighContrast,
    toggleHighContrast,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}