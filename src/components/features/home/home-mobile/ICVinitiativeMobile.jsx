"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import Image from "next/image";
import { useCountry } from "@/context/CountryContext";
import Link from "next/link";
import { useParams } from "next/navigation";
import { isRTLLocale } from "@/lib/countries";
import { renderHtml } from "@/lib/helper";

export default function ICVinitiativeMobile({ title, description, banner, banner_alt_text, data }) {
  // const { countryData } = useCountry();
  const { locale } = useParams();
  const isRTL = isRTLLocale(locale);

  return (
    <section className="pb-[75px] w-full sm:hidden">
      <div className="w-full h-[290px] relative before:absolute before:left-0 before:content-[''] before:bottom-0 before:w-full before:h-full before:bg-black/40 before:z-1">
        <Image src={banner} width="441" height="290" className="absolute top-0 left-0 w-full h-full object-cover" alt={banner_alt_text} />
        <div className="container flex items-end h-full">
          <div className="relative w-full py-[25px] z-1">
            <div className="text-[43px] text-white font-medium uppercase">{title}</div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="py-[30px]">{renderHtml(description, "text-black")}</div>
        <div className="relative">
          <Swiper
            dir={isRTL ? "rtl" : "ltr"}
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-button-next-icv",
              prevEl: ".swiper-button-prev-icv",
            }}
            loop={true}
            slidesPerView={1}
            rewind={true}
            spaceBetween={10}
            className="overflow-hidden"
          >
            {data?.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-full overflow-hidden">
                  <div className="w-full aspect-[400/370] overflow-hidden">
                    <Image
                      src={item?.image_mobile}
                      width="400"
                      height="370"
                      className="w-full h-full object-cover"
                      alt={item?.image_mobile_alt_text}
                    />
                  </div>
                  <div className="text-[20px] xs:text-[25px] text-[#0B436A] uppercase m-[15px_0] ">{item?.title}</div>
                </div>
              </SwiperSlide>
            ))}
            {/* <SwiperSlide>
                            <div className="w-full h-full overflow-hidden">
                                <div className="w-full aspect-[400/370] overflow-hidden">
                                    <Image src="/images/icv-1.jpg" width="400" height="370" className="w-full h-full object-cover" alt="ventureImg" />
                                </div>
                                <div className="text-[20px] xs:text-[25px] text-[#0B436A] uppercase m-[15px_0] ">
                                    Another ICV Initiative Project
                                </div>
                            </div>
                        </SwiperSlide> */}
          </Swiper>

          {/* Navigation Buttons */}
          <button className="swiper-button-prev-icv absolute left-4 top-[calc(50%-60px)] -translate-y-1/2 z-10 w-[34px] h-[34px] flex items-center justify-center bg-white hover:bg-gray-100 rounded-full shadow-lg transition-all">
            <svg width="14" height="13" viewBox="0 0 14 13">
              <path
                d="M0.245458 6.76397C-0.0818176 6.4367 -0.0818176 5.90608 0.245458 5.5788L5.57871 0.245555C5.90598 -0.0817194 6.4366 -0.0817194 6.76387 0.245555C7.09115 0.57283 7.09115 1.10345 6.76387 1.43072L2.02321 6.17139L6.76387 10.9121C7.09115 11.2393 7.09115 11.7699 6.76387 12.0972C6.4366 12.4245 5.90598 12.4245 5.57871 12.0972L0.245458 6.76397ZM13.6497 6.17139V7.00943H0.83804V6.17139V5.33335H13.6497V6.17139Z"
                fill="#299B8A"
              />
            </svg>
          </button>
          <button className="swiper-button-next-icv absolute right-4 top-[calc(50%-60px)] -translate-y-1/2 z-10 w-[34px] h-[34px] flex items-center justify-center bg-white hover:bg-gray-100 rounded-full shadow-lg transition-all">
            <svg width="14" height="13" viewBox="0 0 14 13">
              <path
                d="M13.4042 6.76397C13.7315 6.4367 13.7315 5.90608 13.4042 5.5788L8.07099 0.245555C7.74372 -0.0817194 7.2131 -0.0817194 6.88583 0.245555C6.55855 0.57283 6.55855 1.10345 6.88583 1.43072L11.6265 6.17139L6.88583 10.9121C6.55855 11.2393 6.55855 11.7699 6.88583 12.0972C7.2131 12.4245 7.74372 12.4245 8.07099 12.0972L13.4042 6.76397ZM0 6.17139V7.00943H12.8117V6.17139V5.33335H0V6.17139Z"
                fill="#299B8A"
              />
            </svg>
          </button>

          <Link
            href="#!"
            className="text-[16px] xs:text-[18px] text-[#000000] font-medium w-fit flex items-center justify-center h-[40px] xs:h-[50px]
                           min-w-[120px] xs:min-w-[140px] p-[8px] border border-[#000000] "
          >
            View All
            <div className="w-[14px] xs:w-[17px] h-[14px] flex items-center mx-[10px]">
              <svg className="w-full h-full object-contain" viewBox="0 0 18 14">
                <g clipPath="url(#clip0_1342_4984)">
                  <path
                    d="M9.38156 13.4279C9.27201 13.43 9.16155 13.4034 9.0641 13.3431C8.78295 13.17 8.69731 12.7942 8.86648 12.5133C8.8807 12.4885 10.6478 9.53965 14.0209 7.68392H0.907875C0.574073 7.68392 0.302612 7.41246 0.302612 7.07865C0.302612 
                                        6.74485 0.574073 6.47339 0.907875 6.47339H14.0209C10.6665 4.62824 8.87949 1.66639 8.86194 1.63673C8.6964 1.35407 8.7881 0.977903 
                                        9.07045 0.810547C9.35674 0.640771 9.73382 0.739126 9.90481 1.02693C10.1799 1.46574 12.7595 5.39965 17.3865 6.48822C17.6634 6.55631 17.8552 6.79872 17.8552 
                                        7.07896C17.8552 7.35919 17.6646 7.60221 17.3916 7.66848C12.745 8.76098 10.1742 12.7 9.89634 13.1458C9.78739 13.3204 9.58584 13.4239 9.38156 13.4279Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1342_4984">
                    <rect width="18" height="14" fill="black" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
