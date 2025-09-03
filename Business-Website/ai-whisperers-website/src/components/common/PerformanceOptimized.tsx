import { Suspense, lazy } from 'react';
import dynamic from 'next/dynamic';

export const LazyMotionProvider = dynamic(
  () => import('framer-motion').then(mod => mod.LazyMotion),
  { ssr: true }
);

export const LazyMotionFeatures = lazy(() =>
  import('framer-motion').then(mod => ({ default: mod.domMax }))
);

export function OptimizedMotionDiv({ 
  children, 
  className, 
  ...motionProps 
}: { 
  children: React.ReactNode; 
  className?: string;
  [key: string]: any;
}) {
  return (
    <Suspense fallback={<div className={className}>{children}</div>}>
      <LazyMotionProvider features={LazyMotionFeatures}>
        <div className={className} {...motionProps}>
          {children}
        </div>
      </LazyMotionProvider>
    </Suspense>
  );
}

export function PreloadCriticalCSS() {
  return (
    <>
      <link 
        rel="preload" 
        href="/fonts/inter-var.woff2" 
        as="font" 
        type="font/woff2" 
        crossOrigin="anonymous"
      />
      <style dangerouslySetInnerHTML={{
        __html: `
          .hero-skeleton {
            min-height: 100vh;
            background: linear-gradient(135deg, #f8fafc, #ffffff, #fef7ff);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .hero-content-skeleton {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 1rem;
            text-align: center;
          }
          .hero-title-skeleton {
            height: 240px;
            background: #f1f5f9;
            border-radius: 12px;
            margin-bottom: 32px;
            animation: pulse 1.5s ease-in-out infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        `
      }} />
    </>
  );
}