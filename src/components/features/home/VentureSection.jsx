"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { useRef, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/layout/Heading";
import Link from "next/link";
import VentureCard from "@/components/common/VentureCard";
import { renderHtml } from "@/lib/helper";
import dynamic from "next/dynamic";
import GlobalLoader from "@/components/layout/GlobalLoader";
import { useTranslations } from "next-intl";

const VentureSectionmob = dynamic(() => import("./home-mobile/VentureSectionmob"), { ssr: false });

const CONTACT_BUTTON_CLASS = `
  text-[12px] 2xl:text-[16px] 3xl:text-[18px]
  text-black capitalize font-medium max-sm:!text-white
  flex items-center group transition-all duration-300
  hover:text-[#299B8A] max-w-fit max-lg:m-auto max-lg:mb-[25px]
`;

const ARROW_ICON_CLASS = `
  w-[14px] h-[14px] flex items-center
  mt-[5px] mx-[15px]
  transition-transform duration-300
  group-hover:translate-x-1
`;



export default function VentureSection({
  title,
  ventures,
  banner,
  banner_alt_text,
  lang,
  desc
}) {
  const isRTL = lang?.trim() === "ar";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("common");

  function handleViewAllClick(businessType) {
    document.cookie = `business_type=${businessType}; path=/`;
    window.dispatchEvent(new CustomEvent("businessTypeChanged", { detail: { business_type: businessType } }));
    startTransition(() => { router.push(`/${lang}/venture`); });
  }

  const sectionRef = useRef(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const slideInFromLeft = {
    hidden: {
      opacity: 0,
      x: isRTL ? 50 : -50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const slideInFromRight = {
    hidden: {
      opacity: 0,
      x: isRTL ? -50 : 50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const floatDotVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      x: isRTL ? 20 : -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.3,
      },
    },
    hover: {
      x: 10,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const arrowVariants = {
    rest: {
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    hover: {
      x: 5,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      {isPending && <GlobalLoader />}
      <section
        ref={sectionRef}
        className="relative z-0 py-[45px] 2xl:py-[80px_50px] 3xl:py-[100px_70px] overflow-hidden max-sm:hidden"
      >
        {/* Heading */}
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="max-w-[600px] 2xl:max-w-[700px] 3xl:max-w-[800px] m-auto text-center">
              <Heading size="heading1" as="h1" className="mb-[30px]">
                {title}
              </Heading>
              {
                desc && (
                  renderHtml(desc)
                )
              }
            </div>
          </motion.div>
        </div>

        {/* Combined Ventures Swiper */}
        {(ventures[0]?.ventures?.length > 0 || ventures[1]?.ventures?.length > 0) && (
          <motion.div
            className="relative mt-[40px] 2xl:mt-[60px] 3xl:mt-[80px]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Animated Background Dot */}
            <motion.div
              className="absolute top-0 bottom-0 right-[70px] 2xl:right-[100px] 3xl:right-[150px] m-auto w-[150px] 2xl:w-[200px] 3xl:w-[245px] h-[150px] 2xl:h-[200px] 3xl:h-[245px] blur-[165px] rounded-full bg-[#2FDDC3] animate-float"
              variants={floatDotVariants}
            />

            <div className="lg:!ps-[calc(((100%-var(--breakpoint-lg))/2)+var(--breakpoint-gap-lg))] xl:!ps-[calc(((100%-var(--breakpoint-xl))/2)+var(--breakpoint-gap-xl))] 2xl:!ps-[calc(((100%-var(--breakpoint-2xl))/2)+var(--breakpoint-gap-2xl))] 3xl:!ps-[calc(((100%-var(--breakpoint-3xl))/2)+var(--breakpoint-gap-3xl)/2)] lg:!pe-[calc(((100%-var(--breakpoint-lg))/2)+var(--breakpoint-gap-lg))] xl:!pe-[calc(((100%-var(--breakpoint-xl))/2)+var(--breakpoint-gap-xl))] 2xl:!pe-[calc(((100%-var(--breakpoint-2xl))/2)+var(--breakpoint-gap-2xl))] 3xl:!pe-[calc(((100%-var(--breakpoint-3xl))/2)+var(--breakpoint-gap-3xl)/2)] max-lg:px-[35px]">
              <motion.div
                variants={slideInFromRight}
              >
                <Swiper
                  dir={isRTL ? "rtl" : "ltr"}
                  modules={[Autoplay]}
                  autoplay={{ delay: 0, pauseOnMouseEnter: true }}
                  speed={3500}
                  loop={true}
                  slidesPerView={2}
                  spaceBetween={25}
                  breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 10 },
                    768: { slidesPerView: 2, spaceBetween: 15 },
                    1024: { slidesPerView: 1.4, spaceBetween: 30 },
                    1280: { slidesPerView: 1.5, spaceBetween: 40 },
                    1920: { slidesPerView: 1.5, spaceBetween: 50 },
                  }}
                  className="overflow-hidden pb-[50px] !h-auto [&_.swiper-slide]:!h-auto"
                >
                  {(() => { const a = ventures[0]?.ventures || []; const b = ventures[1]?.ventures || []; const max = Math.max(a.length, b.length); const interleaved = []; for (let i = 0; i < max; i++) { if (a[i]) interleaved.push(a[i]); if (b[i]) interleaved.push(b[i]); } return interleaved; })().map((item, index) => (
                    <SwiperSlide key={index}>
                      <Link href={`/${lang}/venture/${item?.slug}`}>
                        <VentureCard item={item} />
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className="flex justify-center mt-[30px] 2xl:mt-[40px] 3xl:mt-[50px]">
                  <button onClick={() => handleViewAllClick("b2b")} className={`${CONTACT_BUTTON_CLASS}`}>
                    <span>{t("viewAll")}</span>
                    <motion.div
                      className={ARROW_ICON_CLASS}
                      variants={arrowVariants}
                    >
                      <svg className="w-full h-full" viewBox="0 0 14 15">
                        <path
                          d="M7.23334 12.7448C7.14887 12.7465 7.0637 12.7245 6.98857 12.6748C6.7718 12.5318 6.70577 12.2213 6.8362 11.9893C6.84717 11.9688 8.2096 9.53275 10.8103 7.99975H0.700004C0.442637 7.99975 0.233337 7.7755 0.233337 7.49975C0.233337 7.224 0.442637 6.99975 0.700004 6.99975H10.8103C8.22407 5.4755 6.84624 3.02875 6.8327 3.00425C6.70507 2.77075 6.77577 2.46 6.99347 2.32175C7.2142 2.1815 7.50494 2.26275 7.63677 2.5005C7.84887 2.863 9.8378 6.11275 13.4052 7.012C13.6187 7.06825 13.7667 7.2685 13.7667 7.5C13.7667 7.7315 13.6197 7.93225 13.4092 7.987C9.8266 8.8895 7.84444 12.1435 7.63024 12.5118C7.54624 12.656 7.39084 12.7415 7.23334 12.7448Z"
                          fill="currentColor"
                        />
                      </svg>
                    </motion.div>
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </section>

      <VentureSectionmob
        title={title}
        banner={banner}
        banner_alt_text={banner_alt_text}
        ventureSlider={ventures}
        lang={lang}
      />
    </>
  );
}
