interface CDNConfig {
  imageOptimization: boolean;
  staticAssetCaching: boolean;
  edgeCaching: boolean;
  compressionEnabled: boolean;
}

interface CacheStrategy {
  maxAge: number;
  staleWhileRevalidate?: number;
  mustRevalidate?: boolean;
  public?: boolean;
  immutable?: boolean;
}

export const cacheStrategies = {
  static_assets: {
    maxAge: 31536000, // 1 year
    public: true,
    immutable: true,
  } as CacheStrategy,
  
  pages: {
    maxAge: 3600, // 1 hour
    staleWhileRevalidate: 86400, // 24 hours
    public: true,
  } as CacheStrategy,
  
  api_responses: {
    maxAge: 300, // 5 minutes
    staleWhileRevalidate: 900, // 15 minutes
    public: false,
  } as CacheStrategy,
  
  images: {
    maxAge: 2592000, // 30 days
    public: true,
    immutable: false,
  } as CacheStrategy,
  
  dynamic_content: {
    maxAge: 0,
    mustRevalidate: true,
    public: false,
  } as CacheStrategy,
} as const;

class CDNOptimizationService {
  generateCacheHeaders(strategy: CacheStrategy): Record<string, string> {
    const directives: string[] = [];
    
    if (strategy.public) directives.push('public');
    else directives.push('private');
    
    if (strategy.maxAge > 0) directives.push(`max-age=${strategy.maxAge}`);
    if (strategy.staleWhileRevalidate) directives.push(`stale-while-revalidate=${strategy.staleWhileRevalidate}`);
    if (strategy.mustRevalidate) directives.push('must-revalidate');
    if (strategy.immutable) directives.push('immutable');

    return {
      'Cache-Control': directives.join(', '),
      'CDN-Cache-Control': directives.join(', '),
      'Vercel-CDN-Cache-Control': directives.join(', '),
    };
  }

  optimizeImages() {
    return {
      formats: ['image/avif', 'image/webp', 'image/jpeg'],
      deviceSizes: [320, 420, 768, 1024, 1200, 1920],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      minimumCacheTTL: cacheStrategies.images.maxAge,
      dangerouslyAllowSVG: false,
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
      loader: 'default',
      path: '/_next/image',
    };
  }

  getCompressionConfig() {
    return {
      brotli: {
        enabled: true,
        quality: 6,
        threshold: 1000,
      },
      gzip: {
        enabled: true,
        level: 6,
        threshold: 1000,
      },
    };
  }

  generateResourceHints(criticalResources: string[]) {
    return criticalResources.map(resource => ({
      rel: 'preload',
      as: this.getResourceType(resource),
      href: resource,
      crossOrigin: resource.includes('font') ? 'anonymous' : undefined,
    }));
  }

  private getResourceType(resource: string): string {
    if (resource.includes('.woff') || resource.includes('.ttf')) return 'font';
    if (resource.includes('.css')) return 'style';
    if (resource.includes('.js')) return 'script';
    if (resource.includes('.jpg') || resource.includes('.png') || resource.includes('.webp')) return 'image';
    return 'fetch';
  }

  optimizeStaticAssets() {
    return {
      webpack: (config: any, { dev, isServer }: { dev: boolean; isServer: boolean }) => {
        if (!dev && !isServer) {
          // Optimize bundle splitting
          config.optimization.splitChunks = {
            chunks: 'all',
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                priority: 10,
                chunks: 'all',
                enforce: true,
              },
              common: {
                name: 'common',
                minChunks: 2,
                priority: 5,
                chunks: 'all',
                enforce: true,
              },
              styles: {
                name: 'styles',
                test: /\.(css|scss|sass)$/,
                chunks: 'all',
                enforce: true,
              },
            },
          };

          // Tree shaking optimization
          config.optimization.usedExports = true;
          config.optimization.sideEffects = false;
        }
        
        return config;
      },
    };
  }

  getEdgeFunctionConfig() {
    return {
      runtime: 'edge',
      regions: ['iad1', 'sfo1', 'fra1', 'sin1'], // Global edge deployment
    };
  }
}

export const cdnOptimizationService = new CDNOptimizationService();

// Critical resources to preload
export const criticalResources = [
  '/fonts/inter-var.woff2',
  '/images/hero-bg.webp',
  '/css/critical.css',
];

// Resource preloading utility
export function preloadCriticalResources() {
  if (typeof document === 'undefined') return;

  const hints = cdnOptimizationService.generateResourceHints(criticalResources);
  
  hints.forEach(hint => {
    const link = document.createElement('link');
    Object.entries(hint).forEach(([key, value]) => {
      if (value) link.setAttribute(key, value);
    });
    document.head.appendChild(link);
  });
}

// Service Worker for advanced caching
export const swConfig = {
  cacheName: 'ai-whisperers-v1',
  strategies: {
    documents: 'NetworkFirst',
    assets: 'CacheFirst',
    images: 'CacheFirst',
    apis: 'NetworkOnly',
  },
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-cache',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        },
      },
    },
    {
      urlPattern: /^https:\/\/api\.ai-whisperers\.com\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 5, // 5 minutes
        },
      },
    },
  ],
};