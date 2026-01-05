import VendordetailsSection from "@/components/features/venture/VendordetailsSection";
import { getData } from "@/lib/server/api";


export default async function Page({ params }) {
  const resolvedParams = await Promise.resolve(params);
  const { slug, lang } = resolvedParams;

  const { data, error } = await getData(`venture-details?slug=${slug}`, lang);

    if (!data|| error) {
     return <div>Error loading data</div>;
   }
  return (
    <VendordetailsSection
      breadCrumb_data={[
        { href: "/", label: "Home" },
        { href: "/ventures", label: "Ventures" },
        {
          href: `/ventures/${slug}`,
          label: data?.title,
        },
      ]}
      pageData={data}
    />
  );
}
