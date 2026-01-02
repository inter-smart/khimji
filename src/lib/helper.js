import parse from "html-react-parser";

export function formatDate(dateStr) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function HtmlRenderer({ htmlString, className }) {
  return (
    <div
      className={`${className} [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5`}
      dangerouslySetInnerHTML={{ __html: htmlString }}
    />
  );
}




export function renderHtml(htmlString, className="") {
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