"use client";
import BlogCard from "@/components/common/BlogCard";
import { Heading } from "@/components/layout/Heading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useTranslations } from "next-intl";



export default function RelatedBlogSection({ data, lang, variant }) {
    const t = useTranslations("blog")
    return (
        <section className="w-full h-auto py-[5px_40px] sm:py-[10px_60px] lg:py-[10px_80px] 2xl:py-[10px_100px] 3xl:py-[10px_125px] block">
            <div className="container">
                <Heading
                    as="h2"
                    size="heading1"
                    className="!mb-[20px] sm:!mb-[35px] 2xl:!mb-[40px] 3xl:!mb-[60px]"
                >
                    { variant === "news" ? t("related_news") : t("related_blogs")}
                </Heading>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={10}
                    slidesPerView={1.2}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    speed={800}
                    loop={true}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 15,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                        },
                        1536: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                    }}
                    className="related_blog_Slider"
                >
                    {data?.map((item, index) => (
                        <SwiperSlide key={index}>
                            <BlogCard variant={variant} page={"blog_details"} item={item} lang={lang} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}