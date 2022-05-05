/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
const withPlugins = require('next-compose-plugins');

const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPlugins([
  nextConfig,
  [
    withPWA,
    {
      pwa: {
        dest: 'public',
        runtimeCaching,
      },
    },
  ],
  [withBundleAnalyzer, {}],
]);
