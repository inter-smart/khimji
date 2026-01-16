"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";

export default function Brands({ brands, lang }) {
  return (
    <div className="flex flex-wrap pb-[30px] border-b border-white/20 mb-[65px] ">
      <div className="w-full">
        <Swiper
          dir={lang === "ar" ? "rtl" : "ltr"}
          modules={[Autoplay]}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          speed={2500}
          loop={true}
          slidesPerView={2}
          spaceBetween={10}
          breakpoints={{
            640: { slidesPerView: 5 },
            768: { slidesPerView: 8 },
            1024: { slidesPerView: 10 },
            1280: { slidesPerView: 10 },
          }}
          className="w-full h-[50px] xl:h-[75px] 3xl:h-[80px]"
        >
          {brands?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src={item?.logo}
                  alt={item?.logo_alt_text}
                  width={140}
                  height={65}
                  prop
                  className="w-auto object-contain max-w-[75px] 2xl:max-w-[80px] min-w-[45px] xl:min-w-[65px] 2xl:min-w-[75px] transition-[0.5s] hover:scale-90"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
