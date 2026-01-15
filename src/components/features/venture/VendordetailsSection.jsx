import { Heading } from "@/components/layout/Heading";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { renderHtml } from "@/lib/helper";

export default function VendordetailsSection({ breadCrumb_data, pageData }) {
  return (
    <section className="py-[40px] 2xl:py-[55px] 3xl:py-[75px] max-sm:pt-[170px]">
      <div className="container">
        <Heading as="h1" size="heading1" className="mb-[15px]">
          {pageData.title}
        </Heading>

        <Breadcrumb>
          <BreadcrumbList>
            {breadCrumb_data?.map((item, index) => (
              <Fragment key={index}>
                <BreadcrumbItem className="[&_a,span]:text-[13px] sm:[&_a,span]:text-[14px] 2xl:[&_a,span]:text-[18px] [&_a,span]:leading-[1.7] [&_a,span]:font-normal [&_a,span]:text-black [&_a:hover]:text-[#299B8A]">
                  {index === breadCrumb_data.length - 1 ? (
                    <BreadcrumbPage className="pointer-events-none">{item?.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={item?.href}>{item?.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>

                {index !== breadCrumb_data.length - 1 && (
                  <BreadcrumbSeparator>
                    <span className="w-[12px] sm:w-[15px] aspect-square flex items-center justify-center">
                      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7.2334 12.7448C7.14893 12.7465 7.06376 12.7245 6.98863 12.6748C6.77186 12.5318 6.70583 12.2213 6.83626 11.9893C6.84723 11.9688 8.20967 9.53275 10.8104 7.99975H0.700065C0.442698 7.99975 0.233398 7.7755 0.233398 7.49975C0.233398 7.224 0.442698 6.99975 0.700065 6.99975H10.8104C8.22413 5.4755 6.8463 3.02875 6.83277 3.00425C6.70513 2.77075 6.77583 2.46 6.99353 2.32175C7.21426 2.1815 7.505 2.26275 7.63683 2.5005C7.84893 2.863 9.83786 6.11275 13.4053 7.012C13.6188 7.06825 13.7667 7.2685 13.7667 7.5C13.7667 7.7315 13.6197 7.93225 13.4093 7.987C9.82666 8.8895 7.8445 12.1435 7.6303 12.5118C7.5463 12.656 7.3909 12.7415 7.2334 12.7448Z"
                          fill="#313232"
                        />
                      </svg>
                    </span>
                  </BreadcrumbSeparator>
                )}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="w-full relative mt-[30px] mb-[15px] xl:mb-[25px] 2xl:mb-[40px] 3xl:mb-[60px] overflow-hidden rounded-[10px]">
          {/* Desktop Banner */}
          <div className="hidden sm:block aspect-[1640/690] relative">
            {pageData?.banner_type === "video" ? (
              <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                <source src={pageData?.banner_video} type="video/mp4" />
              </video>
            ) : (
              <Image src={pageData?.banner_image} alt={pageData?.banner_alt_text} fill className="object-cover" priority />
            )}
          </div>

          {/* Mobile Banner */}
          <div className="block sm:hidden aspect-[375/420] relative">
            <Image
              src={pageData?.banner_image_mobile || pageData?.banner_image}
              alt={pageData?.banner_mobile_alt_text || pageData?.banner_alt_text}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <h2 className="lg:text-[22px] xl:text-[30px] 2xl:text-[40px] 3xl:text-[50px] text-[#0B436A] font-normal uppercase mb-[10px] xl:mb-[15px] 2xl:mb-[25px] 3xl:mb-[30px]">
          {pageData?.overview_title}
        </h2>
        {renderHtml(pageData.overview_description)}

        <div className="flex flex-wrap -m-[10px] 2xl:-m-[12px] 3xl:-m-[15px] mt-[30px] 2xl:mt-[40px] 3xl:mt-[60px]">
          {pageData?.medias?.map((item) => (
            <div key={item.id} className="sm:w-1/2 p-[10px] 2xl:p-[12px] 3xl:p-[15px]">
              <div className="w-full h-full block rounded-[10px] overflow-hidden relative p-[1px] group transition-all hover:bg-gradient-to-r hover:from-[#0B436A] hover:to-[#299B8A]">
                <div className="p-[20px_15px] xl:p-[25px_20px] 2xl:p-[35px_25px] 3xl:p-[40px_35px] bg-[#F7FAFA] rounded-[10px] overflow-hidden">
                  <div className="w-full rounded-[10px] overflow-hidden mb-[15px] 2xl:mb-[25px] 3xl:mb-[40px]">
                    <picture className="w-full h-full">
                      <source media="(max-width: 640px)" srcSet={item?.image_mobile}></source>
                      <Image
                        src={item?.image}
                        width={740}
                        height={340}
                        alt={item?.image_alt_text}
                        className="w-full h-full object-cover transition-all duration-250 group-hover:scale-105"
                      />
                    </picture>
                  </div>

                  <div className="text-[16px] lg:text-[18px] 2xl:text-[22px] 3xl:text-[28px] text-[#0B436A] uppercase mb-[5px]">{item?.title}</div>

                  <div className="text-[14px] lg:text-[16px] 2xl:text-[20px] 3xl:text-[26px] mb-[10px]">{item?.subtitle}</div>

                  <div className="flex">
                    <div className="pe-[15px] flex-1">{renderHtml(item.description)}</div>
                    <div className="w-[80px] md:w-[100px] xl:w-[130px] 3xl:w-[165px]">
                      <Image src={item?.logo} width={165} height={55} alt={item?.logo_alt_text} className="w-full h-full object-contain" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
