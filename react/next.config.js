/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    config.resolve.alias = {
      '@': path.resolve(__dirname),
      ...config.resolve.alias,
    };
    return config;
  },
};

module.exports = nextConfig;
