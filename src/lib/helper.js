export function formatDate(dateStr) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function HtmlRenderer({ htmlString, className }) {
  return (
    <div
       className={`${className}`}
      dangerouslySetInnerHTML={{ __html: htmlString }}
    />
  );
}
