/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'graphql.svcc.mobi',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
