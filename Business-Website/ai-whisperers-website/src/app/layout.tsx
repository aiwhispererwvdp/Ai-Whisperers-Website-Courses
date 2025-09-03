import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PayPalProvider from '@/components/payment/PayPalProvider';
import SessionProvider from '@/components/auth/SessionProvider';
import WebVitals from '@/components/analytics/WebVitals';
import A11yProvider from '@/components/accessibility/A11yProvider';
import MobileTouchOptimizer from '@/components/accessibility/MobileTouchOptimizer';
import AnalyticsProvider from '@/components/analytics/AnalyticsProvider';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'AI-Whisperers | The World\'s Only Complete AI Learning Journey',
    template: '%s | AI-Whisperers',
  },
  description: 'Master AI from complete beginner to expert in 65.5 hours. Production-ready skills, not theoretical knowledge. The only comprehensive AI education available anywhere.',
  keywords: [
    'AI education',
    'AI courses',
    'machine learning',
    'artificial intelligence training',
    'AI web development',
    'comprehensive AI learning',
    'AI for business',
    'no-code AI',
    'production-ready AI skills',
  ],
  authors: [{ name: 'AI-Whisperers Team', url: 'https://ai-whisperers.com' }],
  creator: 'AI-Whisperers',
  publisher: 'AI-Whisperers',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ai-whisperers.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ai-whisperers.com',
    siteName: 'AI-Whisperers',
    title: 'AI-Whisperers | Complete AI Learning Journey',
    description: 'The world\'s only comprehensive AI education from beginner to expert. 4 specialized tracks, 65.5 hours, production-ready skills.',
    images: [
      {
        url: '/og/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI-Whisperers - Complete AI Learning Journey',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI-Whisperers | Complete AI Learning Journey',
    description: 'Master AI from beginner to expert. Production-ready skills, comprehensive curriculum, immediate career impact.',
    creator: '@aiwhisperers',
    images: ['/og/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased bg-white text-gray-900`}>
        <AnalyticsProvider>
          <A11yProvider>
            <SessionProvider>
              <PayPalProvider>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main id="main-content" className="flex-1" role="main" tabIndex={-1}>
                    {children}
                  </main>
                  <Footer />
                </div>
              </PayPalProvider>
            </SessionProvider>
            <MobileTouchOptimizer />
            <WebVitals />
          </A11yProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
