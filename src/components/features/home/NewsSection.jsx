"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import Image from "next/image";
import { Heading } from "@/components/layout/Heading";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { formatDate } from "@/lib/helper";

export default function NewsSection({ lang, data }) {
    const tHome = useTranslations("home");
    const tCommon = useTranslations("common");

    const isRTL = lang?.trim() === "ar";
    const news = data || [];

    if (!news.length) return null;

    return (
        <section className='relative z-0 py-[45px] 2xl:py-[80px_50px] 3xl:py-[100px_70px] bg-[#FAFAFA] overflow-hidden'>
            <div className="container">
                <div className="max-w-[420px] 2xl:max-w-[450px] 3xl:max-w-[600px] m-auto text-center relative z-20">
                    <Heading size="heading1" as="h2" className="mb-[30px]">
                        {tHome("news")}
                    </Heading>
                </div>

                <div className="relative w-full z-20 px-4 md:px-12">
                    <Swiper
                        dir={isRTL ? "rtl" : "ltr"}
                        modules={[Autoplay, Navigation]}
                        navigation={{
                            prevEl: ".news-prev",
                            nextEl: ".news-next",
                        }}
                        // autoplay={{
                        //     delay: 100,
                        //     disableOnInteraction: false,
                        //     pauseOnMouseEnter: true,
                        // }}
                        speed={3000}
                        loop={true}
                        slidesPerView={2}
                        spaceBetween={15}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 2.5 },
                            1024: { slidesPerView: 3 },
                            1280: { slidesPerView: 3 },
                        }}
                        className="w-full"
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
                                            {formatDate(item?.published_on, lang)}
                                        </div>

                                        <div className="text-[13px] sm:text-[14px] 2xl:text-[18px] 3xl:text-[22px] leading-[1.5] font-normal text-black mb-[10px] sm:mb-[15px] lg:mb-[20px] 3xl:mb-[30px] line-clamp-2">
                                            {item.title}
                                        </div>

                                        <Link
                                            href={`/${lang}/newsroom/${item.slug}`}
                                            target="_self"
                                            className="text-[13px] sm:text-[14px] 2xl:text-[15px] 3xl:text-[18px] leading-[1.5] font-normal text-black w-fit flex items-center hover:text-[#0B436A] transition-colors duration-300"
                                        >
                                            {tCommon("viewAll")}

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

                    <button
                        className="news-prev absolute left-0 md:left-2 top-[50%] -translate-y-1/2 z-30 w-8 h-8 md:w-10 md:h-10 rounded-full border border-black/10 bg-white/95 backdrop-blur-sm shadow-sm text-black hover:bg-black hover:text-white transition-all flex items-center justify-center cursor-pointer"
                        aria-label="Previous slide"
                    >
                        <svg
                            width="8"
                            height="14"
                            viewBox="0 0 8 14"
                            fill="none"
                            className="w-2 md:w-2.5 h-auto"
                        >
                            <path
                                d="M7 13L1 7L7 1"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    <button
                        className="news-next absolute right-0 md:right-2 top-[50%] -translate-y-1/2 z-30 w-8 h-8 md:w-10 md:h-10 rounded-full border border-black/10 bg-white/95 backdrop-blur-sm shadow-sm text-black hover:bg-black hover:text-white transition-all flex items-center justify-center cursor-pointer"
                        aria-label="Next slide"
                    >
                        <svg
                            width="8"
                            height="14"
                            viewBox="0 0 8 14"
                            fill="none"
                            className="w-2 md:w-2.5 h-auto"
                        >
                            <path
                                d="M1 13L7 7L1 1"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}