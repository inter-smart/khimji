"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";
import { Heading } from "@/components/layout/Heading";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NewsSection({ lang, data }) {
    const tHome = useTranslations("home");
    const tCommon = useTranslations("common");
    const isRTL = lang?.trim() === "ar";
    const news = data|| [];

    if (!news.length) return null;

    return (
        <section
            className='relative z-0 py-[45px] 2xl:py-[80px_50px] 3xl:py-[100px_70px] bg-[#FAFAFA] overflow-hidden' >
            <div className="container">
                <div className="max-w-[420px] 2xl:max-w-[450px] 3xl:max-w-[600px] m-auto text-center relative z-20">
                    <Heading size="heading1" as="h2" className="mb-[30px]">
                        {tHome("news")}
                    </Heading>
                </div>

                <Swiper
                    dir={isRTL ? "rtl" : "ltr"}
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 100,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    speed={3000}
                    loop={true}
                    pauseOnhover={true}
                    slidesPerView={2}
                    spaceBetween={15}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 2.5 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 3 },
                    }}
                    className="relative z-20"
                >
                    {news.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="group w-full h-full p-[10px] sm:p-[15px] 2xl:p-[20px] bg-transparent rounded-[5px] 2xl:rounded-[10px] border border-white backdrop-blur-[20px] backdrop-saturate-[180%] shadow-[inset_5px_1px_33px_#f1f1f1,inset_3px_-3px_5px_#fafafa] block">
                                <div className="w-full h-auto aspect-[500/290] mb-[10px] rounded-[5px] 2xl:rounded-[10px] overflow-hidden block">
                                    <Image
                                        src={item.thumbnail_image}
                                        alt={item.image_alt_text || item.title}
                                        width={500}
                                        height={290}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="w-full h-auto p-[10px] sm:p-[15px] 2xl:p-[20px]">
                                    <div className="text-[12px] sm:text-[13px] 2xl:text-[14px] 3xl:text-[16px] leading-[1.5] font-normal text-white w-fit p-[5px_15px] 2xl:p-[7px_20px] 3xl:p-[10px_30px] mb-[10px] sm:mb-[15px] lg:mb-[20px] 3xl:mb-[30px] bg-linear-to-r from-[#0B436A] to-[#299B8A] rounded-full">
                                        {new Date(item.published_on).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                                    </div>
                                    <div className="text-[13px] sm:text-[14px] 2xl:text-[18px] 3xl:text-[22px] leading-[1.5] font-normal text-black mb-[10px] sm:mb-[15px] lg:mb-[20px] 3xl:mb-[30px] line-clamp-2">
                                        {item.title}
                                    </div>
                                    <Link
                                        href={`/${lang}/newsroom/${item.slug}`}
                                        target={"_self"}
                                        className="text-[13px] sm:text-[14px] 2xl:text-[15px] 3xl:text-[18px] leading-[1.5] font-normal text-black w-fit flex items-center hover:text-[#0B436A] transition-colors duration-300">{tCommon("viewAll")}
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
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}
