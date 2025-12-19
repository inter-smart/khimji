import { Heading } from "@/components/layout/Heading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";

export default function VendordetailsSection({ breadCrumb_data }) {
  return (
    <section className="py-[75px]">
      <div className="container">
        <Heading
          as="h2"
          size="heading1"
          className="mb-[10px] sm:!mb-0"
        >
          Logistics & Shipping
        </Heading>

        <Breadcrumb>
          <BreadcrumbList>
            {breadCrumb_data?.map((item, index) => (
              <Fragment key={index}>
                <BreadcrumbItem
                  className="[&_a,span]:text-[13px] sm:[&_a,span]:text-[14px] 2xl:[&_a,span]:text-[18px] [&_a,span]:leading-[1.7] [&_a,span]:font-normal [&_a,span]:text-black [&_a:hover]:text-[#299B8A]"
                >
                  {index === breadCrumb_data.length - 1 ? (
                    <BreadcrumbPage className="pointer-events-none">
                      {item?.link?.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={item?.link?.href}>
                        {item?.link?.label}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>

                {index !== breadCrumb_data.length - 1 && (
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
      </div>
    </section>
  );
}
