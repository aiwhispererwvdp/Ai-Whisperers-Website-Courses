'use client';

import { useEffect } from 'react';
import { createSkipLink } from '@/lib/accessibility';

interface AccessibleLayoutProps {
  children: React.ReactNode;
}

export default function AccessibleLayout({ children }: AccessibleLayoutProps) {
  useEffect(() => {
    createSkipLink();
  }, []);

  return (
    <>
      <div
        id="live-region"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
      
      <div
        id="alert-region"
        role="alert"
        aria-live="assertive"
        className="sr-only"
      />
      
      <main id="main-content" className="focus:outline-none" tabIndex={-1}>
        {children}
      </main>
    </>
  );
}