import VendordetailsSection from "@/components/features/venture/VendordetailsSection";

 

export default function Page() {
  return (
    <>
        <VendordetailsSection    breadCrumb_data={[
            { link: { href: "/", label: "Home" } },
            { link: { href: "/Ventures", label: "Ventures" } },
            { link: { href: "/VentuLogistics & Shippinges", label: "Logistics & Shipping" } },
          ]}/>
    </>
  )
}
 
