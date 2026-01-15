import parse from "html-react-parser";

export function formatDate(dateStr) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function renderHtml(htmlString, className = "") {
  if (!htmlString) return null;

  return (
    <div className={className}>
      {parse(htmlString, {
        replace: (domNode) => {
          if (domNode.attribs) {
            // Remove ALL attributes from incoming HTML
            delete domNode.attribs.class;
          }
        },
      })}
    </div>
  );
}

export function parseInitiativeDescription(html = "") {
  if (!html) return [];

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Remove all class attributes
  doc.querySelectorAll("*").forEach((el) => el.removeAttribute("class"));

  // Function to clean content - keep only p, span, strong tags
  const cleanContent = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const allowedTags = ["P", "SPAN", "STRONG", "BR"];
    const allElements = tempDiv.querySelectorAll("*");

    allElements.forEach((el) => {
      if (!allowedTags.includes(el.tagName)) {
        const parent = el.parentNode;
        while (el.firstChild) {
          parent.insertBefore(el.firstChild, el);
        }
        parent.removeChild(el);
      }
    });

    return tempDiv.innerHTML.trim();
  };

  // Get the container (skip nested divs)
  let container = doc.body;
  while (container.children.length === 1 && container.children[0].tagName === "DIV") {
    container = container.children[0];
  }

  const childNodes = Array.from(container.children);
  const sections = [];
  let currentSection = null;

  childNodes.forEach((node) => {
    // Check for strong tag anywhere in the node
    const strong = node.querySelector("strong");

    if (strong) {
      // Strong tag found - extract as title
      const title = strong.textContent.trim();

      // Check if this is an h3 with content div structure
      if (node.tagName === "DIV") {
        const h3 = node.querySelector("h3");
        const contentDiv = node.querySelector("div");

        if (h3) {
          // Structure: div > h3 + div with p tags
          let content = "";
          if (contentDiv) {
            const pTags = contentDiv.querySelectorAll("p");
            pTags.forEach((p) => {
              const cleaned = cleanContent(p.innerHTML).trim();
              if (cleaned && cleaned !== "&nbsp;" && cleaned.replace(/&nbsp;/g, "").trim()) {
                content += `<p>${cleaned}</p>`;
              }
            });
          }

          currentSection = { title, content };
          sections.push(currentSection);
        } else {
          // Structure: div > strong (title follows in next nodes)
          currentSection = { title, content: "" };
          sections.push(currentSection);
        }
      } else if (node.tagName === "P") {
        // Structure: p > strong + content in same p
        const contentNode = node.cloneNode(true);
        const strongInContent = contentNode.querySelector("strong");
        if (strongInContent) {
          strongInContent.remove();
        }

        // Remove the first br tag after strong
        const firstBr = contentNode.querySelector("br");
        if (firstBr) {
          firstBr.remove();
        }

        let content = contentNode.innerHTML.trim();
        content = cleanContent(content);

        // Only add if there's actual content
        if (content && content !== "&nbsp;" && content.replace(/&nbsp;/g, "").trim()) {
          currentSection = { title, content: `<p>${content}</p>` };
          sections.push(currentSection);
        } else {
          // No content in same p, expect it in following nodes
          currentSection = { title, content: "" };
          sections.push(currentSection);
        }
      }
    } else {
      // No strong tag - this is content
      if (node.tagName === "P" && currentSection) {
        const content = cleanContent(node.innerHTML).trim();
        if (content && content !== "&nbsp;" && content.replace(/&nbsp;/g, "").trim()) {
          currentSection.content += `<p>${content}</p>`;
        }
      }
    }
  });

  return sections;
}

/**
 * Parses HTML meta tags and scripts into Next.js metadata format
 * Handles: <meta>, <link>, <script type="application/ld+json">
 *
 * @param {string} htmlString - Raw HTML string from admin
 * @returns {Object} - Parsed metadata object { other, links, scripts }
 */
export function parseMetaTags(htmlString) {
  if (!htmlString || typeof htmlString !== "string" || htmlString.trim() === "") {
    return { other: {}, links: [], scripts: [] };
  }

  const other = {};
  const links = [];
  const scripts = [];

  try {
    // ==========================================
    // 1. PARSE META TAGS
    // ==========================================
    // Matches: <meta name="..." content="...">
    //          <meta property="..." content="...">
    //          <meta http-equiv="..." content="...">
    //          <meta charset="...">
    const metaRegex = /<meta\s+([^>]+?)>/gi;
    let metaMatch;

    while ((metaMatch = metaRegex.exec(htmlString)) !== null) {
      const attributes = metaMatch[1];

      // Extract all possible attribute combinations
      const nameMatch = attributes.match(/name\s*=\s*["']([^"']+)["']/i);
      const propertyMatch = attributes.match(/property\s*=\s*["']([^"']+)["']/i);
      const httpEquivMatch = attributes.match(/http-equiv\s*=\s*["']([^"']+)["']/i);
      const charsetMatch = attributes.match(/charset\s*=\s*["']?([^"'\s>]+)["']?/i);
      const contentMatch = attributes.match(/content\s*=\s*["']([^"']*)["']/i);
      const itemPropMatch = attributes.match(/itemprop\s*=\s*["']([^"']+)["']/i);

      const content = contentMatch ? contentMatch[1] : "";

      // Handle different meta tag types
      if (charsetMatch) {
        // <meta charset="utf-8"> - Usually handled by Next.js automatically
        other["charset"] = charsetMatch[1];
      } else if (nameMatch) {
        // <meta name="..." content="...">
        const key = nameMatch[1];
        other[key] = content;
      } else if (propertyMatch) {
        // <meta property="..." content="..."> (OpenGraph, Facebook, etc.)
        const key = propertyMatch[1];
        other[key] = content;
      } else if (httpEquivMatch) {
        // <meta http-equiv="..." content="...">
        const key = httpEquivMatch[1];
        other[key] = content;
      } else if (itemPropMatch) {
        // <meta itemprop="..." content="..."> (Microdata)
        const key = `itemprop:${itemPropMatch[1]}`;
        other[key] = content;
      }
    }

    // ==========================================
    // 2. PARSE LINK TAGS
    // ==========================================
    // Matches: <link rel="..." href="...">
    //          <link rel="icon" href="...">
    //          <link rel="canonical" href="...">
    //          <link rel="alternate" hreflang="..." href="...">
    const linkRegex = /<link\s+([^>]+?)>/gi;
    let linkMatch;

    while ((linkMatch = linkRegex.exec(htmlString)) !== null) {
      const attributes = linkMatch[1];

      const relMatch = attributes.match(/rel\s*=\s*["']([^"']+)["']/i);
      const hrefMatch = attributes.match(/href\s*=\s*["']([^"']+)["']/i);
      const hreflangMatch = attributes.match(/hreflang\s*=\s*["']([^"']+)["']/i);
      const typeMatch = attributes.match(/type\s*=\s*["']([^"']+)["']/i);
      const sizesMatch = attributes.match(/sizes\s*=\s*["']([^"']+)["']/i);
      const mediaMatch = attributes.match(/media\s*=\s*["']([^"']+)["']/i);
      const asMatch = attributes.match(/as\s*=\s*["']([^"']+)["']/i);
      const crossoriginMatch = attributes.match(/crossorigin\s*=\s*["']([^"']+)["']/i);

      if (relMatch && hrefMatch) {
        const linkObj = {
          rel: relMatch[1],
          href: hrefMatch[1],
        };

        // Add optional attributes if present
        if (hreflangMatch) linkObj.hreflang = hreflangMatch[1];
        if (typeMatch) linkObj.type = typeMatch[1];
        if (sizesMatch) linkObj.sizes = sizesMatch[1];
        if (mediaMatch) linkObj.media = mediaMatch[1];
        if (asMatch) linkObj.as = asMatch[1];
        if (crossoriginMatch) linkObj.crossOrigin = crossoriginMatch[1];

        links.push(linkObj);
      }
    }

    // ==========================================
    // 3. PARSE JSON-LD SCRIPTS
    // ==========================================
    // Matches: <script type="application/ld+json">{...}</script>
    const scriptRegex = /<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    let scriptMatch;

    while ((scriptMatch = scriptRegex.exec(htmlString)) !== null) {
      try {
        const jsonContent = scriptMatch[1].trim();
        // Remove HTML comments if present
        const cleanedJson = jsonContent.replace(/<!--[\s\S]*?-->/g, "");
        const parsedJson = JSON.parse(cleanedJson);
        scripts.push(parsedJson);
      } catch (e) {
        console.warn("Failed to parse JSON-LD script:", e.message);
        // Continue parsing other scripts even if one fails
      }
    }

    // ==========================================
    // 4. PARSE REGULAR SCRIPTS (Optional)
    // ==========================================
    // Matches: <script src="..."></script> or <script>...</script>
    // Note: Be careful with this - only include if you trust the admin input
    const externalScriptRegex = /<script[^>]*src\s*=\s*["']([^"']+)["'][^>]*><\/script>/gi;
    let externalScriptMatch;
    const externalScripts = [];

    while ((externalScriptMatch = externalScriptRegex.exec(htmlString)) !== null) {
      const srcMatch = externalScriptMatch[1];
      if (srcMatch) {
        externalScripts.push({ src: srcMatch, type: "external" });
      }
    }

    // Only add external scripts if there are any
    if (externalScripts.length > 0) {
      // Store separately to handle with caution
      other["_external_scripts"] = externalScripts;
    }

    // ==========================================
    // 5. HANDLE SPECIAL CASES
    // ==========================================

    // Remove duplicates from 'other' (keep last occurrence)
    const uniqueOther = {};
    Object.keys(other).forEach((key) => {
      uniqueOther[key] = other[key];
    });

    // Handle viewport separately if needed (Next.js has built-in viewport support)
    if (uniqueOther["viewport"]) {
      // Store but flag it - Next.js might handle this differently
      uniqueOther["_viewport_override"] = uniqueOther["viewport"];
    }

    return {
      other: uniqueOther,
      links,
      scripts,
    };
  } catch (error) {
    console.error("Error parsing meta tags:", error);
    return { other: {}, links: [], scripts: [] };
  }
}

/**
 * Sanitize and validate parsed metadata
 * Removes potentially dangerous or conflicting tags
 *
 * @param {Object} parsedMeta - Output from parseMetaTags
 * @returns {Object} - Sanitized metadata
 */
export function sanitizeMetadata(parsedMeta) {
  const { other, links, scripts } = parsedMeta;

  // List of meta tags that should NOT be overridden (Next.js manages these)
  const reservedMetaTags = [
    "viewport", // Next.js handles this via viewport export
    "charset", // Next.js sets this automatically
  ];

  // Filter out reserved tags
  const sanitizedOther = {};
  Object.keys(other).forEach((key) => {
    if (!reservedMetaTags.includes(key.toLowerCase())) {
      sanitizedOther[key] = other[key];
    }
  });

  // Validate links (ensure hrefs are valid URLs or paths)
  const sanitizedLinks = links.filter((link) => {
    try {
      // Check if href is a valid URL or relative path
      if (link.href.startsWith("http") || link.href.startsWith("https") || link.href.startsWith("/")) {
        return true;
      }
      return false;
    } catch {
      return false;
    }
  });

  return {
    other: sanitizedOther,
    links: sanitizedLinks,
    scripts,
  };
}

/**
 * Helper function to merge admin meta with existing OpenGraph/Twitter data
 * Prevents duplication and gives priority to admin-defined values
 *
 * @param {Object} existing - Existing metadata object
 * @param {Object} parsed - Parsed metadata from admin
 * @returns {Object} - Merged metadata
 */
export function mergeMetadata(existing, parsed) {
  const { other, links, scripts } = sanitizeMetadata(parsed);

  // Extract OpenGraph tags from 'other'
  const ogTags = {};
  const twitterTags = {};
  const remainingOther = {};

  Object.keys(other).forEach((key) => {
    if (key.startsWith("og:")) {
      // Remove 'og:' prefix for Next.js openGraph object
      const ogKey = key.replace("og:", "");
      ogTags[ogKey] = other[key];
    } else if (key.startsWith("twitter:")) {
      // Remove 'twitter:' prefix for Next.js twitter object
      const twitterKey = key.replace("twitter:", "");
      twitterTags[twitterKey] = other[key];
    } else {
      remainingOther[key] = other[key];
    }
  });

  return {
    ...existing,
    openGraph: {
      ...existing.openGraph,
      ...ogTags,
    },
    twitter: {
      ...existing.twitter,
      ...twitterTags,
    },
    other: {
      ...existing.other,
      ...remainingOther,
    },
    // Add links if any (icons, canonical, etc.)
    ...(links.length > 0 && { links }),
    // Store scripts separately
    structuredData: scripts.length > 0 ? scripts : existing.structuredData,
  };
}

export function parseOtherMeta(htmlString) {
  if (!htmlString || htmlString.trim() === "") {
    return { other: {}, scripts: [] };
  }

  const other = {};
  const scripts = [];

  // Extract meta tags
  const metaRegex = /<meta\s+([^>]+)>/gi;
  let match;

  while ((match = metaRegex.exec(htmlString)) !== null) {
    const attributes = match[1];

    // Parse attributes
    const nameMatch = attributes.match(/name=["']([^"']+)["']/);
    const propertyMatch = attributes.match(/property=["']([^"']+)["']/);
    const httpEquivMatch = attributes.match(/http-equiv=["']([^"']+)["']/);
    const contentMatch = attributes.match(/content=["']([^"']+)["']/);

    const content = contentMatch ? contentMatch[1] : "";

    if (nameMatch) {
      other[nameMatch[1]] = content;
    } else if (propertyMatch) {
      other[propertyMatch[1]] = content;
    } else if (httpEquivMatch) {
      other[httpEquivMatch[1]] = content;
    }
  }

  // Extract script tags (for JSON-LD)
  const scriptRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let scriptMatch;

  while ((scriptMatch = scriptRegex.exec(htmlString)) !== null) {
    try {
      const jsonContent = scriptMatch[1].trim();
      scripts.push(JSON.parse(jsonContent));
    } catch (e) {
      console.error("Failed to parse JSON-LD:", e);
    }
  }

  return { other, scripts };
}
