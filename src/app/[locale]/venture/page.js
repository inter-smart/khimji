import InnerHero from "@/components/common/InnerHero";
import VentureListingSection from "@/components/features/venture/VentureListingSection";

export default function Page() {
    return (
        <>
            <div className="overflow-hidden">
                <InnerHero
                    coverImage="/images/vetureBanner.jpg"
                    coverImageMobile="/images/vetureBanner.jpg"
                    alt="Venture Banner"
                    title="Fast-Tracking Oman’s <br> Economic Future"
                    breadCrumb_data={[
                        { link: { href: "/", label: "Home" } },
                        { link: { href: "/venture", label: "Ventures" } },
                    ]}
                />
                <VentureListingSection />
            </div>
        </>
    )
}
