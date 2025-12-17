import ArchiveSection from "@/components/features/home/ArchiveSection";
import BannerSection from "@/components/features/home/BannerSection";
import HeritageSection from "@/components/features/home/HeritageSection";
import ParnerSectionMobile from "@/components/features/home/home-mobile/ParnerSectionMobile";
import ICVSection from "@/components/features/home/ICVSection";
import VentureSection from "@/components/features/home/VentureSection";




export default function Page() {
  return (
    <>
      <BannerSection />
      <VentureSection />
       <HeritageSection />
     <ArchiveSection />
     <ICVSection /> 
     <ParnerSectionMobile />
    </>
  )
}
