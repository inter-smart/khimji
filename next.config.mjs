// import bundleAnalyzer from "@next/bundle-analyzer";

// const withBundleAnalyzer = bundleAnalyzer({
//   enabled: process.env.ANALYZE === "true",
// });

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.khimji-ramdas.dev5.intersmarthosting.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/en/archives",
        destination: "/en/newsroom",
        permanent: true,
      },
      {
        source: "/ar/archives",
        destination: "/ar/newsroom",
        permanent: true,
      },
      {
        source: "/en/ventures",
        destination: "/en/venture",
        permanent: true,
      },
      {
        source: "/ar/ventures",
        destination: "/ar/venture",
        permanent: true,
      },
      {
        source: "/en/news",
        destination: "/en/newsroom",
        permanent: true,
      },
      {
        source: "/ar/news",
        destination: "/ar/newsroom",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
