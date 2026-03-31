import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/helper";

export default function BlogCard({page="blog", item, variant }) {
    return (
        <div className="group w-full h-full p-[10px] sm:p-[15px] 2xl:p-[20px] bg-transparent rounded-[5px] 2xl:rounded-[10px] border border-white backdrop-blur-[20px] backdrop-saturate-[180%] shadow-[inset_5px_1px_33px_#f1f1f1,inset_3px_-3px_5px_#fafafa] block">
            <div className="w-full h-auto aspect-[500/290] mb-[10px] rounded-[5px] 2xl:rounded-[10px] overflow-hidden block">
                <Image
                    src={item?.thumbnail_image}
                    alt={item?.image_alt_text}
                    width={500}
                    height={290}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="w-full h-auto p-[10px] sm:p-[15px] 2xl:p-[20px]">
                <div className="text-[12px] sm:text-[13px] 2xl:text-[14px] 3xl:text-[16px] leading-[1.5] font-normal text-white w-fit p-[5px_15px] 2xl:p-[7px_20px] 3xl:p-[10px_30px] mb-[10px] sm:mb-[15px] lg:mb-[20px] 3xl:mb-[30px] bg-linear-to-r from-[#0B436A] to-[#299B8A] rounded-full">{formatDate(item?.published_on)}</div>
                <div className="text-[13px] sm:text-[14px] 2xl:text-[18px] 3xl:text-[22px] leading-[1.5] font-normal text-black mb-[10px] sm:mb-[15px] lg:mb-[20px] 3xl:mb-[30px] line-clamp-2">{item?.title}</div>
                <Link
                    href={variant ? `${variant === "news" ? "newsroom" : "blog"}/${item?.slug}`: `${item?.slug}`}
                    target={"_self"}
                    className="text-[13px] sm:text-[14px] 2xl:text-[15px] 3xl:text-[18px] leading-[1.5] font-normal text-black w-fit flex items-center hover:text-[#0B436A] transition-colors duration-300">View All
                    <span className="w-[15px] 3xl:w-[20px] h-auto aspect-square ms-[8px] sm:ms-[10px] 3xl:ms-[15px] flex items-center justify-center">
                        <Image
                            src="/images/blog_arrow.svg"
                            alt="Arrow"
                            width={20}
                            height={20}
                            className="w-full h-full object-contain"
                        />
                    </span>
                </Link>
            </div>
        </div>
    )
}
