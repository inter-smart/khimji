// import bundleAnalyzer from "@next/bundle-analyzer";

// const withBundleAnalyzer = bundleAnalyzer({
//   enabled: process.env.ANALYZE === "true",
// });

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
        permanent: true, // 308 redirect (SEO-friendly)
      },
      {
        source: "/ar/archives",
        destination: "/ar/newsroom",
        permanent: true, // 308 redirect (SEO-friendly)
      },
            {
        source: "/en/news",
        destination: "/en/newsroom",
        permanent: true, // 308 redirect (SEO-friendly)
      },
      {
        source: "/ar/news",
        destination: "/ar/newsroom",
        permanent: true, // 308 redirect (SEO-friendly)
      },
    ];
  },
};

export default nextConfig;
