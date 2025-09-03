/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable ESLint during builds for now to focus on functionality
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Enable experimental features for optimal performance
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons'],
  },
  
  // Image optimization configuration
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: [
      'localhost',
      'ai-whisperers.com',
      'cdn.ai-whisperers.com',
      // Add other domains as needed for course content
    ],
  },
  
  // Performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Compression and optimization
  compress: true,
  
  // Environment configuration
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Redirects for SEO optimization
  async redirects() {
    return [
      // Add redirects as needed
    ];
  },
};

module.exports = nextConfig;