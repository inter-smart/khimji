import Link from "next/link";
import Image from "next/image";
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
    <section className="w-full h-auto block relative z-0">
      <div className="w-full h-auto aspect-[1920/530] overflow-hidden block">
        <picture className="w-full h-full">
          <source media="(max-width: 640px)" srcSet={coverImageMobile}></source>
          <Image
            src={coverImage}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        </picture>
      </div>
      <div className="container py-[60px] absolute z-1 inset-[auto_auto_0_0]">
        <div
          dangerouslySetInnerHTML={{ __html: title }}
          className="text-[70px] leading-[1.3] font-normal text-white uppercase mb-[35px]"
        ></div>
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
          <>
            <BreadcrumbItem
              key={index}
              className="[&>*]:text-[18px] [&>*]:leading-[1.7] [&>*]:font-normal [&>*]:text-white [&>*]:hover:text-[#299B8A]"
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
              <BreadcrumbSeparator asChild>
                <span className="w-[15px] h-[15px] aspect-square flex items-center justify-center">
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
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
