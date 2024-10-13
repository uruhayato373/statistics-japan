const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '**',
      },
    ],
    domains: ['localhost'],
    minimumCacheTTL: 60,
    formats: ['image/webp'],
  },
  env: {
    ESTAT_API_APPID: process.env.ESTAT_API_APPID,
    ESTAT_API_KEY: process.env.ESTAT_API_KEY,
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
    staticPageGenerationTimeout: 180,
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/fonts/[name].[hash][ext]',
      },
    })

    if (!isServer && process.env.NODE_ENV === 'production') {
      // Tree shakingを強化
      config.optimization.usedExports = true
    }

    // コード分割の最適化
    config.optimization.splitChunks = {
      chunks: 'all',
      minSize: 20000,
      maxSize: 244000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    }

    return config
  },
  // 本番環境でのみソースマップを無効化
  productionBrowserSourceMaps: false,
}

module.exports = withBundleAnalyzer(nextConfig)
