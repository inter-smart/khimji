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

            if (domNode.name === "a") {
              domNode.attribs.style = "text-decoration: underline;";
            }

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

export function sanitizeMetadata(parsedMeta) {
  const { other, links, scripts, inlineScripts } = parsedMeta;

  const reservedMetaTags = ["viewport", "charset"];

  const sanitizedOther = {};
  Object.keys(other).forEach((key) => {
    if (!reservedMetaTags.includes(key.toLowerCase())) {
      sanitizedOther[key] = other[key];
    }
  });

  const sanitizedLinks = links.filter((link) => {
    try {
      if (link.href.startsWith("http") || link.href.startsWith("https") || link.href.startsWith("/")) {
        return true;
      }
      return false;
    } catch {
      return false;
    }
  });

  // ⚠️ SECURITY WARNING: Inline scripts can be dangerous!
  // Only allow if you trust the admin completely
  const sanitizedInlineScripts = inlineScripts
    .map((script) => {
      if (script.type === "inline") {
        // You can add content filtering here
        // For example, block certain dangerous patterns
        const dangerousPatterns = [/eval\s*\(/gi, /Function\s*\(/gi, /document\.write/gi, /<iframe/gi];

        const isDangerous = dangerousPatterns.some((pattern) => pattern.test(script.content));

        if (isDangerous) {
          console.warn("Blocked potentially dangerous inline script:", script.content);
          return null;
        }
      }
      return script;
    })
    .filter(Boolean);

  return {
    other: sanitizedOther,
    links: sanitizedLinks,
    scripts,
    inlineScripts: sanitizedInlineScripts,
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

export function parseMetaTags(htmlString) {
  if (!htmlString || typeof htmlString !== "string" || htmlString.trim() === "") {
    return { other: {}, links: [], scripts: [], inlineScripts: [] };
  }

  const other = {};
  const links = [];
  const scripts = [];
  const inlineScripts = []; // NEW: Store inline scripts separately

  try {
    // ==========================================
    // 1. PARSE META TAGS (same as before)
    // ==========================================
    const metaRegex = /<meta\s+([^>]+?)>/gi;
    let metaMatch;

    while ((metaMatch = metaRegex.exec(htmlString)) !== null) {
      const attributes = metaMatch[1];

      const nameMatch = attributes.match(/name\s*=\s*["']([^"']+)["']/i);
      const propertyMatch = attributes.match(/property\s*=\s*["']([^"']+)["']/i);
      const httpEquivMatch = attributes.match(/http-equiv\s*=\s*["']([^"']+)["']/i);
      const charsetMatch = attributes.match(/charset\s*=\s*["']?([^"'\s>]+)["']?/i);
      const contentMatch = attributes.match(/content\s*=\s*["']([^"']*)["']/i);
      const itemPropMatch = attributes.match(/itemprop\s*=\s*["']([^"']+)["']/i);

      const content = contentMatch ? contentMatch[1] : "";

      if (charsetMatch) {
        other["charset"] = charsetMatch[1];
      } else if (nameMatch) {
        other[nameMatch[1]] = content;
      } else if (propertyMatch) {
        other[propertyMatch[1]] = content;
      } else if (httpEquivMatch) {
        other[httpEquivMatch[1]] = content;
      } else if (itemPropMatch) {
        other[`itemprop:${itemPropMatch[1]}`] = content;
      }
    }

    // ==========================================
    // 2. PARSE LINK TAGS (same as before)
    // ==========================================
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
    // 3. PARSE ALL SCRIPT TAGS
    // ==========================================

    // 3a. JSON-LD Scripts
    const jsonLdRegex = /<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    let jsonLdMatch;

    while ((jsonLdMatch = jsonLdRegex.exec(htmlString)) !== null) {
      try {
        const jsonContent = jsonLdMatch[1].trim();
        const cleanedJson = jsonContent.replace(/<!--[\s\S]*?-->/g, "");
        const parsedJson = JSON.parse(cleanedJson);
        scripts.push(parsedJson);
      } catch (e) {
        console.warn("Failed to parse JSON-LD script:", e.message);
      }
    }

    // 3b. External Scripts (with src attribute)
    const externalScriptRegex = /<script[^>]*src\s*=\s*["']([^"']+)["'][^>]*>[\s\S]*?<\/script>/gi;
    let externalMatch;

    while ((externalMatch = externalScriptRegex.exec(htmlString)) !== null) {
      const srcMatch = externalMatch[1];
      if (srcMatch) {
        inlineScripts.push({
          type: "external",
          src: srcMatch,
          content: null,
        });
      }
    }

    // 3c. Inline Scripts (NEW - handles your case)
    // Match <script>...</script> that are NOT JSON-LD and NOT external
    const inlineScriptRegex = /<script(?![^>]*type\s*=\s*["']application\/ld\+json["'])(?![^>]*src\s*=)([^>]*)>([\s\S]*?)<\/script>/gi;
    let inlineMatch;

    while ((inlineMatch = inlineScriptRegex.exec(htmlString)) !== null) {
      const attributes = inlineMatch[1];
      const scriptContent = inlineMatch[2].trim();

      if (scriptContent) {
        const scriptObj = {
          type: "inline",
          content: scriptContent,
          attributes: attributes.trim(),
        };

        // Parse any attributes (async, defer, type, etc.)
        const asyncMatch = attributes.match(/async/i);
        const deferMatch = attributes.match(/defer/i);
        const typeMatch = attributes.match(/type\s*=\s*["']([^"']+)["']/i);

        if (asyncMatch) scriptObj.async = true;
        if (deferMatch) scriptObj.defer = true;
        if (typeMatch) scriptObj.scriptType = typeMatch[1];

        inlineScripts.push(scriptObj);
      }
    }

    return {
      other,
      links,
      scripts, // JSON-LD only
      inlineScripts, // Inline + External scripts
    };
  } catch (error) {
    console.error("Error parsing meta tags:", error);
    return { other: {}, links: [], scripts: [], inlineScripts: [] };
  }
}
export function NoDataState({title, message }) {
  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="text-center">
        <div className="w-[60px] h-[60px] bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-[30px] h-[30px] text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <p className="text-[16px] 2xl:text-[18px] text-[#666] font-medium mb-2">
          {title}
        </p>
        <p className="text-[14px] 2xl:text-[16px] text-[#999]">{message}.</p>
      </div>
    </div>
  );
}



export const splitIntoSections = (html) => {
  if (!html) return [];

  // Split by <strong> tags
  const parts = html.split(/(<strong>.*?<\/strong>)/g).filter(Boolean);

  // If no <strong> tags, return the whole text as one section
  if (!parts.some((p) => p.startsWith("<strong>"))) {
    return [{ title: "", description: html.trim() }];
  }

  const sections = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith("<strong>")) {
      const title = part.replace(/<\/?strong>/g, "").trim();
      const description = parts[i + 1] ? parts[i + 1].trim() : "";
      sections.push({ title, description });
      i++; // skip description
    }
  }

  return sections;
};
