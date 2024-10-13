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
  },
  env: {
    ESTAT_API_APPID: process.env.ESTAT_API_APPID,
    ESTAT_API_KEY: process.env.ESTAT_API_KEY,
  },
  experimental: {
    // appDir: true,
    // workerThreads: true,
    // cpus: 4,
    serverComponentsExternalPackages: ['https-proxy-agent'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/fonts/[name].[hash][ext]',
      },
    })

    return config
  },
}

module.exports = nextConfig
