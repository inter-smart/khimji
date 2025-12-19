import VendordetailsSection from "@/components/features/venture/VendordetailsSection";

 

export default function Page() {
  return (
    <>
        <VendordetailsSection    breadCrumb_data={[
            { link: { href: "/", label: "Home" } },
            { link: { href: "/heritage", label: "Heritage" } },
          ]}/>
    </>
  )
}
function BreadCrumb({ items }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <Fragment key={index}>
            <BreadcrumbItem
              key={index}
              className="[&_a,span]:text-[13px] sm:[&_a,span]:text-[14px] 2xl:[&_a,span]:text-[18px] [&_a,span]:leading-[1.7] [&_a,span]:font-normal [&_a,span]:text-white [&_a:hover]:text-[#299B8A]"
            >
              {index === items.length - 1 ? (
                <BreadcrumbPage className="pointer-events-none">
                  {item?.link?.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item?.link?.href}>{item?.link?.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index !== items.length - 1 && (
              <BreadcrumbSeparator>
                <span className="w-[12px] sm:w-[15px] h-auto aspect-square flex items-center justify-center">
                  <Image
                    src="/images/breadcrumb.svg"
                    alt="breadCrumb"
                    width={15}
                    height={15}
                    className="w-full h-full object-contain"
                  />
                </span>
              </BreadcrumbSeparator>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
