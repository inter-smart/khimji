import InnerHero from "@/components/common/InnerHero";
import NationSection from "@/components/features/ICV-initiative/NationSection";
import ProcurementSection from "@/components/features/ICV-initiative/ProcurementSection";
import QuestionSection from "@/components/features/ICV-initiative/QuestionSection";
import { getAPI } from "@/lib/api";
import { getData } from "@/lib/server/api";

export default async function Page({params}) {
   const resolvedParams = await params;
  const lang = resolvedParams.lang;

    
 // Simple GET request
   const {data, error} = await getData("icv-intiatives", lang);
 
   if (!data|| error) {
     return <div>Error loading data</div>;
   }
  const { banner, intiatives_cms, initiatives } = data;

  return (
    <>
      <InnerHero
        coverImage={banner?.banner}
        coverImageMobile={banner?.banner_mobile}
        alt={banner?.banner_alt_text}
        title={banner?.banner_title}
        breadCrumb_data={[
          { link: { href: "/", label: "Home" } },
          { link: { href: "/ICV", label: "ICV Initiatives" } },
        ]}
      />
      <NationSection
        title={intiatives_cms?.section1_title}
        description={intiatives_cms?.section1_description}
        image={intiatives_cms?.section1_image}
        image_alt_text={intiatives_cms?.section1_image_alt_text}
      />
      <ProcurementSection initiatives={initiatives} />
      <QuestionSection
        title={intiatives_cms?.section2_title}
        description={intiatives_cms?.section2_description}
        form_title={intiatives_cms?.section2_form_title}
      />
    </>
  );
}
