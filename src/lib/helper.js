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
    <p className={className}>
      {parse(htmlString, {
        replace: (domNode) => {
          if (domNode.attribs) {
            // Remove ALL attributes from incoming HTML
            delete domNode.attribs.class;
          }
        },
      })}
    </p>
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
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    const allowedTags = ['P', 'SPAN', 'STRONG', 'BR'];
    const allElements = tempDiv.querySelectorAll('*');
    
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
              if (cleaned && cleaned !== "&nbsp;" && cleaned.replace(/&nbsp;/g, '').trim()) {
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
        if (content && content !== "&nbsp;" && content.replace(/&nbsp;/g, '').trim()) {
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
        if (content && content !== "&nbsp;" && content.replace(/&nbsp;/g, '').trim()) {
          currentSection.content += `<p>${content}</p>`;
        }
      }
    }
  });

  return sections;
}