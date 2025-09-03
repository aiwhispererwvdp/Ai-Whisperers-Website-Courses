import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Check if user is trying to access protected routes
    const { pathname } = req.nextUrl;
    
    // Protected dashboard routes
    if (pathname.startsWith('/dashboard') && !req.nextauth.token) {
      const signInUrl = new URL('/auth/signin', req.url);
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }

    // Protected course content routes
    if (pathname.startsWith('/course-content') && !req.nextauth.token) {
      const signInUrl = new URL('/auth/signin', req.url);
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }

    // Redirect authenticated users from auth pages to dashboard
    if (pathname.startsWith('/auth/signin') && req.nextauth.token) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    const response = NextResponse.next();

    // Apply SEO and caching optimizations
    if (pathname.startsWith('/api/')) {
      response.headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=900');
      response.headers.set('CDN-Cache-Control', 'public, max-age=3600');
    } else if (pathname === '/' || pathname.startsWith('/courses') || pathname.startsWith('/blog')) {
      response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
      response.headers.set('CDN-Cache-Control', 'public, max-age=86400');
    }

    // SEO headers
    response.headers.set('X-Robots-Tag', 'index, follow');
    
    // Performance headers
    response.headers.set('Accept-CH', 'DPR, Viewport-Width, Width');
    response.headers.set('Vary', 'Accept, Accept-Encoding, Accept-CH');

    return response;
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl;
        
        // Public routes that don't require authentication
        const publicRoutes = [
          '/',
          '/courses',
          '/case-studies',
          '/portfolio',
          '/contact',
          '/about',
          '/blog',
          '/consultation',
        ];
        
        // Allow access to public routes and auth pages
        if (publicRoutes.some(route => pathname.startsWith(route)) || 
            pathname.startsWith('/auth/') ||
            pathname.startsWith('/api/auth/')) {
          return true;
        }

        // Require authentication for protected routes
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)',
  ],
};