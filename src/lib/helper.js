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
    if (node.tagName === "DIV") {
      // CONDITION 1: Title in <div><strong>, content in following <p>
      const strong = node.querySelector("strong");
      if (strong) {
        currentSection = {
          title: strong.textContent.trim(),
          content: "",
        };
        sections.push(currentSection);
      }
    } else if (node.tagName === "P") {
      const strong = node.querySelector("strong");
      
      if (strong) {
        // CONDITION 2: Title and content in same <p> separated by <br>
        const title = strong.textContent.trim();
        
        // Clone and extract content
        const contentNode = node.cloneNode(true);
        const strongInContent = contentNode.querySelector("strong");
        if (strongInContent) {
          strongInContent.remove();
        }
        
        // Remove the first br tag
        const firstBr = contentNode.querySelector("br");
        if (firstBr) {
          firstBr.remove();
        }

        let content = contentNode.innerHTML.trim();
        content = cleanContent(content);

        // Only add if there's actual content
        if (content && content !== "&nbsp;" && content.replace(/&nbsp;/g, '').trim()) {
          sections.push({
            title: title,
            content: `<p>${content}</p>`,
          });
        }
      } else if (currentSection) {
        // CONDITION 1: This <p> is content for the previous section
        const content = cleanContent(node.innerHTML).trim();
        if (content && content !== "&nbsp;" && content.replace(/&nbsp;/g, '').trim()) {
          currentSection.content += `<p>${content}</p>`;
        }
      }
    }
  });

  return sections;
}