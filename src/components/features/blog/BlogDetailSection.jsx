import { formatDate } from "@/lib/helper";
import Image from "next/image";

export default function BlogDetailSection({ data }) {

  return (
    <section className="w-full h-auto py-[30px] sm:py-[50px_70px] lg:py-[65px_80px] 2xl:py-[110px_120px] 3xl:py-[135px_160px] block relative z-0">
      <div className="w-[120px] sm:w-[180px] 2xl:w-[225px] 3xl:w-[280px] h-auto aspect-square bg-[#2FDDC3] rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[120px] pointer-events-none absolute -z-1 inset-[0_auto_auto_-2%]"></div>
      <div className="w-[170px] sm:w-[220px] 2xl:w-[285px] 3xl:w-[370px] h-auto aspect-square bg-[#1A9BF5] rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[180px] pointer-events-none opacity-40 absolute -z-1 inset-[15%_0_auto_auto]"></div>
      <div className="w-[170px] sm:w-[220px] 2xl:w-[285px] 3xl:w-[370px] h-auto aspect-square bg-[#1A9BF5] rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[150px] pointer-events-none opacity-40 absolute -z-1 inset-[35%_auto_auto_-10%]"></div>
      <div className="container">
        <h1 className="text-[18px] sm:text-[24px] lg:text-[34px] 2xl:text-[40px] 3xl:text-[50px] leading-[1.5] font-normal text-[#0B436A] mb-[20px] sm:mb-[30px] 2xl:mb-[40px] 3xl:mb-[50px]">
          {data?.title}
        </h1>
        <div className="group w-full h-auto aspect-[1640/590] mb-[30px] sm:mb-[40px] lg:mb-[50px] 2xl:mb-[60px] 3xl:mb-[80px] rounded-[5px] sm:rounded-[7px] 2xl:rounded-[10px] overflow-hidden block">
          <Image
            src={data?.featured_image || "/images/placeholder.png"}
            alt={data?.image_alt_text || "Blog Detail"}
            width={1640}
            height={590}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="text-[12px] sm:text-[14px] 2xl:text-[15px] 3xl:text-[16px] leading-[1] font-normal text-white w-fit p-[5px_15px] sm:p-[5px_20px] 2xl:p-[10px_25px] mb-[20px] sm:mb-[30px] 2xl:mb-[35px] 3xl:mb-[50px] bg-linear-to-r from-[#0B436A] to-[#299B8A] rounded-full">
          {formatDate(data?.published_on)}
        </div>
        <div
          className="typography sm:[&_img]:float-left [&_img]:w-full sm:[&_img]:w-[240px] lg:[&_img]:w-[320px] 2xl:[&_img]:w-[385px] 3xl:[&_img]:w-[485px] sm:[&_img]:m-[0_30px_20px_0] lg:[&_img]:m-[0_40px_30px_0] 2xl:[&_img]:m-[0_50px_30px_0] 3xl:[&_img]:m-[0_70px_40px_0] [&_p]:text-[14px] 2xl:[&_p]:text-[16px] 3xl:[&_p]:text-[20px] [&_p]:leading-[1.8] [&_p]:font-normal [&_p]:text-black [&>*]:mb-[20px] 2xl:[&>*]:mb-[30px]"
          dangerouslySetInnerHTML={{ __html: data?.content }}
        />
      </div>
    </section>
  );
}
