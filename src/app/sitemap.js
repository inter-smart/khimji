import fs from "fs";
import path from "path";

const baseUrl = "https://khimji-ramdas-dev.vercel.app";
const languages = ["en", "ar"];

// Automatically discover static routes from app/[lang] directory
function getStaticRoutes(dir, baseRoute = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let routes = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    // Skip special files and dynamic routes
    if (
      entry.name.startsWith("_") ||
      entry.name === "api" ||
      entry.name.includes("[") || // Skip [slug] folders
      !entry.isDirectory()
    ) {
      continue;
    }

    // Check if directory has page.js or page.tsx
    const hasPage =
      fs.existsSync(path.join(fullPath, "page.js")) ||
      fs.existsSync(path.join(fullPath, "page.tsx"));

    if (hasPage) {
      const route = baseRoute ? `${baseRoute}/${entry.name}` : `/${entry.name}`;
      routes.push(route);
    }

    // Recursively check subdirectories
    routes = routes.concat(
      getStaticRoutes(
        fullPath,
        baseRoute ? `${baseRoute}/${entry.name}` : `/${entry.name}`
      )
    );
  }

  return routes;
}

export default async function sitemap() {
  const langDir = path.join(process.cwd(), "src/app/[lang]");

  // Get all static routes automatically from [lang] directory
  const staticPaths = getStaticRoutes(langDir);

  // Add root route
  const allStaticPaths = ["", ...staticPaths];

  // Generate routes for each language
  const staticRoutes = languages.flatMap((lang) =>
    allStaticPaths.map((route) => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: route === "" ? 1 : 0.8,
    }))
  );

  return [...staticRoutes];
}
