/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
const withPlugins = require('next-compose-plugins');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withPWA = require('next-pwa');
// const runtimeCaching = require('next-pwa/cache');

module.exports = withPlugins([
  nextConfig,
  [
    withPWA,
    {
      pwa: {
        disable: process.env.NODE_ENV === 'development',
        dest: 'public',
        // runtimeCaching,
      },
    },
  ],
  [withBundleAnalyzer, {}],
]);
