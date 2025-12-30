import InnerHero from "@/components/common/InnerHero";
import VentureListingSection from "@/components/features/venture/VentureListingSection";
import { getAPI } from "@/lib/api";

export default async function Page() {
 // Simple GET request
   const result = await getAPI("ventures");
   const data = result.data;
 
   if (!data) {
     return <div>Error loading data</div>;
   }
   const {
     banner,
     venture_cms,
     venture_categories
   } = data;
 
    return (
        <>
            <div className="overflow-hidden">
                <InnerHero
                    coverImage={banner?.banner}
                    coverImageMobile={banner?.banner_mobile}
                    alt={banner?.banner_alt_text}
                    title={banner?.banner_title}
                    breadCrumb_data={[
                        { link: { href: "/", label: "Home" } },
                        { link: { href: "/venture", label: "Ventures" } },
                    ]}
                />
                <VentureListingSection data={venture_categories} title={venture_cms?.title} />
            </div>
        </>
    )
}
