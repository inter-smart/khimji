import InnerHero from "@/components/common/InnerHero";
import VentureListingSection from "@/components/features/venture/VentureListingSection";
import { getAPI } from "@/lib/api";
import { getData } from "@/lib/server/api";
import { getRequestContext } from "@/lib/server/getCookieData";

export default async function Page({params}) {
   const resolvedParams = await params;
  const lang = resolvedParams.lang;

  const context = await getRequestContext();
    
 // Simple GET request
   const {data, error} = await getData("ventures", lang);
 
   if (!data|| error) {
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
                <VentureListingSection data={venture_categories} title={venture_cms?.title} context={context} />
            </div>
        </>
    )
}
