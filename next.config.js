/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};
