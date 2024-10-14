/** @type {import('next').NextConfig} */
const nextConfig = {
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
  },
  // env: {
  //   ESTAT_API_APPID: process.env.ESTAT_API_APPID,
  //   ESTAT_API_KEY: process.env.ESTAT_API_KEY,
  // },
  experimental: {
    optimizeCss: true, // CSSを最適化
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
    staticPageGenerationTimeout: 180,
    // serverComponentsExternalPackages: ['https-proxy-agent'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/fonts/[name].[hash][ext]',
      },
    })

    // if (!isServer && process.env.NODE_ENV === 'production') {
    //   // Tree shakingを強化
    //   config.optimization.usedExports = true
    // }
    return config
  },
  // 静的アセットの最適化
  images: {
    minimumCacheTTL: 60,
    formats: ['image/webp'],
  },
}

module.exports = nextConfig
