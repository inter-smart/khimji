export default function robots() {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
    sitemap: "https://khimji-ramdas-dev.vercel.app/sitemap.xml",
  };
}
