const path = require('path')
const webpack = require('webpack')

const ONE_YEAR_CACHE = 'public, max-age=31536000, immutable'
const nextPolyfillStub = path.join(
  __dirname,
  'src/lib/next-polyfill-module-stub.js'
)

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  productionBrowserSourceMaps: true,
  compress: true,
  experimental: {
    inlineCss: true,
  },
  webpack(config) {
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/polyfill-module$/, (resource) => {
        if (
          resource.context.includes(
            path.join('node_modules', 'next', 'dist', 'client')
          ) ||
          resource.context.includes(
            path.join('node_modules', 'next', 'dist', 'esm', 'client')
          )
        ) {
          resource.request = nextPolyfillStub
        }
      })
    )

    return config
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [70, 75, 80],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'index, follow' }],
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: ONE_YEAR_CACHE }],
      },
      {
        source: '/favicon.ico',
        headers: [{ key: 'Cache-Control', value: ONE_YEAR_CACHE }],
      },
    ]
  },
}

module.exports = nextConfig
