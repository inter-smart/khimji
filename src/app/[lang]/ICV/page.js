import InnerHero from "@/components/common/InnerHero";
import NationSection from "@/components/features/ICV-initiative/NationSection";
import ProcurementSection from "@/components/features/ICV-initiative/ProcurementSection";
import QuestionSection from "@/components/features/ICV-initiative/QuestionSection";

export default function Page() {
    return (
        <>
            <InnerHero
                coverImage="/images/icv-banner.jpg"
                coverImageMobile="/images/icv-banner.jpg"
                alt="ICV Banner"
                title="ICV Intiatives"
                breadCrumb_data={[
                    { link: { href: "/", label: "Home" } },
                    { link: { href: "/ICV", label: "ICV Initiatives" } },
                ]}
            />
            <NationSection />
            <ProcurementSection />
            <QuestionSection />
        </>
    )
}
