/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === 'development'

const nextConfig = {
  // Use separate distDirs for dev vs prod so a `next build` never corrupts the
  // dev server cache. Both suffixed with `.nosync` so iCloud skips them.
  distDir: isDev ? '.next.dev.nosync' : '.next.nosync',

  // output: 'export' and basePath are only needed for GitHub Pages deployment.
  // In dev mode, we run as a normal server on localhost:3000.
  ...(isDev ? {} : {
    output: 'export',
    basePath: '/beehoop',
    env: {
      NEXT_PUBLIC_BASE_PATH: '/beehoop',
    },
  }),
  images: {
    unoptimized: true,
  },
  // Speeds up dev compilation dramatically for large 3D/animation libraries
  experimental: {
    optimizePackageImports: [
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'framer-motion',
      'gsap',
    ],
  },
  // Turbopack config (used by `next dev --turbo`)
  turbopack: {
    // No custom rules needed — optimizePackageImports above covers the heavy libs.
  },
  // Webpack config (used by `next build` / non-turbo dev only)
  webpack: (config, { dev }) => {
    if (dev) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'named',
        chunkIds: 'named',
      }
    }
    return config
  },
}

export default nextConfig
