/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 15+ has app directory enabled by default
  experimental: {
    // appDir option is no longer needed in Next.js 15+
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Optimize webpack performance
  webpack: (config, { dev, isServer }) => {
    // Enable persistent caching
    config.cache = true;
    
    // Optimize production builds
    if (!dev) {
      config.optimization.minimize = true;
    }
    
    return config;
  },
  // Enable React strict mode for better performance and fewer bugs
  reactStrictMode: true,
  // Enable static optimization where possible
  staticPageGenerationTimeout: 120,
  // Next.js 13+ has app directory enabled by default
  // experimental configuration is already defined above
  // Netlify specific settings
  trailingSlash: false,
  poweredByHeader: false,
}

export default nextConfig
