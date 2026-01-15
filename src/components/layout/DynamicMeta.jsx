export default function DynamicMeta({ htmlString }) {
  if (!htmlString || htmlString.trim() === "") {
    return null;
  }

  return <head dangerouslySetInnerHTML={{ __html: htmlString }} />;
}
