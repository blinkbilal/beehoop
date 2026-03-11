/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/beehoop',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/beehoop',
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
