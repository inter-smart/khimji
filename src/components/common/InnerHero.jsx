import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function InnerHero({
  coverImage,
  coverImageMobile,
  alt,
  title,
  breadCrumb_data,
}) {
  return (
    <section className="w-full h-[420px] sm:h-[450px] lg:h-[350px] 2xl:h-[420px] 3xl:h-[530px] flex items-end relative z-0 before:content-[''] before:w-full before:h-full before:bg-gradient-to-t before:from-black before:to-transparent before:opacity-80 before:absolute before:z-1 before:inset-0">
      <div className="w-full h-full block absolute -z-1 inset-0">
        <picture className="w-full h-full">
          <source media="(max-width: 640px)" srcSet={coverImageMobile}></source>
          <Image
            src={coverImage}
            alt={alt}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </picture>
      </div>
      <div className="container py-[20px] sm:py-[30px] lg:py-[40px] 2xl:py-[50px] 3xl:py-[60px] relative z-2">
        <h1
          dangerouslySetInnerHTML={{ __html: title }}
          className="text-[22px] sm:text-[28px] md:text-[34px] lg:text-[45px] 2xl:text-[55px] 3xl:text-[70px] leading-[1.3] font-normal text-white uppercase mb-2.5 sm:mb-[15px] lg:mb-[20px] 2xl:mb-[30px] 3xl:mb-[35px]"
        ></h1>
        <BreadCrumb items={breadCrumb_data} />
      </div>
    </section>
  );
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
