"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";
import { useMemo } from "react";

export default function Brands({ brands, lang }) {
  // Memoize breakpoints to prevent recalculation
  const swiperConfig = useMemo(() => ({
    dir: lang === "ar" ? "rtl" : "ltr",
    modules: [Autoplay],
    autoplay: { 
      delay: 0, 
      disableOnInteraction: false,
      pauseOnMouseEnter: false // Prevent reflow on hover
    },
    speed: 2500,
    loop: true,
    // CRITICAL: Fixed slidesPerView instead of 'auto'
    slidesPerView: 2,
    spaceBetween: 10,
    breakpoints: {
      640: { slidesPerView: 5, spaceBetween: 10 },
      768: { slidesPerView: 8, spaceBetween: 10 },
      1024: { slidesPerView: 10, spaceBetween: 10 },
      1280: { slidesPerView: 10, spaceBetween: 10 },
    },
    // Performance optimizations
    watchSlidesProgress: false, // Disable progress watching
    observer: false, // Disable mutation observer
    observeParents: false,
    observeSlideChildren: false,
    // Prevent layout calculations
    centeredSlides: false,
    freeMode: false,
    // GPU acceleration
    cssMode: false, // Keep false for autoplay
  }), [lang]);

  // Early return if no brands
  if (!brands || brands.length === 0) {
    return (
      <div className="flex flex-wrap pb-[30px] border-b border-white/20 mb-[65px]">
        <div className="w-full h-[50px] xl:h-[75px] 3xl:h-[80px]" />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap pb-[30px] border-b border-white/20 mb-[65px]">
      <div className="w-full">
        <Swiper
          {...swiperConfig}
          className="w-full h-[50px] xl:h-[75px] 3xl:h-[80px]"
          style={{
            // Force fixed height to prevent reflow
            height: '50px',
            willChange: 'transform', // GPU hint
          }}
        >
          {brands?.map((item, index) => (
            <SwiperSlide key={item?.id || index}>
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{ 
                  // Fixed dimensions prevent layout shift
                  minHeight: '50px',
                  contain: 'layout style paint', // CSS containment
                }}
              >
                <Image
                  src={item?.logo}
                  alt={item?.logo_alt_text || `Brand ${index + 1}`}
                  width={80}
                  height={65}
                  priority={index < 10} // Priority for first 10 visible
                  loading={index < 10 ? "eager" : "lazy"}
                  quality={75} // Reduce quality slightly for faster load
                  sizes="(max-width: 640px) 75px, (max-width: 768px) 80px, 80px"
                  className="w-auto h-auto object-contain max-w-[75px] max-h-[65px] 2xl:max-w-[80px] min-w-[45px] xl:min-w-[65px] 2xl:min-w-[75px] transition-transform duration-500 hover:scale-90"
                  style={{
                    // Prevent layout shift during image load
                    aspectRatio: '80/65',
                    maxHeight: '65px',
                  }}
                  // Prevent image dragging which can cause reflows
                  draggable={false}
                  onError={(e) => {
                    // Fallback on error
                    e.target.style.opacity = '0';
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}