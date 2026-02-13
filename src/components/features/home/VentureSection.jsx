"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { motion } from "framer-motion";
import { useRef } from "react";

import { Heading } from "@/components/layout/Heading";
import Link from "next/link";
import VentureCard from "@/components/common/VentureCard";
import { renderHtml } from "@/lib/helper";
import dynamic from "next/dynamic";


const VentureSectionmob = dynamic(() => import("./home-mobile/VentureSectionmob"), { ssr: false });

const CONTACT_BUTTON_CLASS = `
  text-[12px] 2xl:text-[16px] 3xl:text-[18px]
  text-black capitalize font-medium
  flex items-center group transition-all duration-300
  hover:text-[#299B8A] max-w-fit max-lg:m-auto max-lg:mb-[25px]
`;

const ARROW_ICON_CLASS = `
  w-[14px] h-[14px] flex items-center
  mt-[5px] mx-[15px]
  transition-transform duration-300
  group-hover:translate-x-1
`;

const VENTURE_SLIDES = [
  {
    video: "/videos/venture-1.mp4",
    mobileImage: "/images/vetureCard-2.jpg",
    title: "Logistics & Shipping",
    description:
      "Khimji Ramdas Shipping and Multimodal Logistics , KRHL (Khimji Ramdas Heavy Lift), Schenker Khimji's LLC, Khimji's Sparkle Marine Services SAOC, Middle East Fuji Khimji LLC",
    logos: [
      "/images/ship-1.png",
      "/images/ship-2.png",
      "/images/ship-3.png",
      "/images/ship-4.png",
    ],
  },
  {
    video: "/videos/venture-2.mp4",
    mobileImage: "/images/vetureCard-2.jpg",
    title: "Logistics & Shipping",
    description:
      "Khimji Ramdas Shipping and Multimodal Logistics , KRHL (Khimji Ramdas Heavy Lift), Schenker Khimji's LLC, Khimji's Sparkle Marine Services SAOC, Middle East Fuji Khimji LLC",
    logos: [
      "/images/ship-1.png",
      "/images/ship-2.png",
      "/images/ship-3.png",
      "/images/ship-4.png",
    ],
  },
];

export default function VentureSection({
  title,
  ventures,
  banner,
  banner_alt_text,
  lang,
}) {
  const isRTL = lang?.trim() === "ar";

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
            <Heading size="heading1" as="h1" className="text-center">
              {title}
            </Heading>
          </motion.div>
        </div>

        {/* First Venture Section */}

        {ventures[0] && (
          <motion.div
            className="
                    relative 
                    lg:!ps-[calc(((100%-var(--breakpoint-lg))/2)+var(--breakpoint-gap-lg))]
                    xl:!ps-[calc(((100%-var(--breakpoint-xl))/2)+var(--breakpoint-gap-xl))]
                    2xl:!ps-[calc(((100%-var(--breakpoint-2xl))/2)+var(--breakpoint-gap-2xl))]
                    3xl:!ps-[calc(((100%-var(--breakpoint-3xl))/2)+var(--breakpoint-gap-3xl)/2)]
                    not-last-of-type:mb-[20px] not-last-of-type:xl:mb-[60px] not-last-of-type:2xl:mb-[100px] not-last-of-type:3xl:mb-[140px]
                "
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

            <div className="flex flex-wrap w-full">
              {/* LEFT CONTENT */}
              <div className="w-full lg:w-[240px] xl:w-[300px] 2xl:w-[400px] 3xl:w-[450px] flex items-center">
                <motion.div
                  className="w-full max-w-[75%] max-lg:text-center max-lg:m-auto"
                  variants={slideInFromLeft}
                >
                  <motion.div variants={itemVariants}>
                    <Heading size="heading2" as="div">
                      {ventures[0]?.title}
                    </Heading>
                  </motion.div>

                  <motion.div
                    className="mb-[15px] lg:mb-[20px] xl:mb-[25px] 2xl:mb-[30px] 3xl:mb-[40px]"
                    variants={itemVariants}
                  >
                    {renderHtml(ventures[0]?.description)}
                  </motion.div>

                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    initial="rest"
                    animate="rest"
                  >
                    <Link href={`/venture`} className={CONTACT_BUTTON_CLASS}>
                      <span>{lang === "en" ? "View All" : "عرض الكل"}</span>
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
                    </Link>
                  </motion.div>
                </motion.div>
              </div>

              {/* RIGHT CONTENT - Swiper */}
              <div className="w-full lg:w-[calc(100%-240px)] xl:w-[calc(100%-300px)] 2xl:w-[calc(100%-400px)] 3xl:w-[calc(100%-450px)] max-lg:px-[35px] lg:ps-[60px] overflow-hidden">
                <motion.div
                  variants={slideInFromRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <Swiper
                    dir={isRTL ? "rtl" : "ltr"}
                    // modules={[Autoplay]}
                    // autoplay={{ delay: 0, disableOnInteraction: false }}
                    speed={3500}
                    loop={true}
                    slidesPerView={2}
                    rewind={true}
                    spaceBetween={25}
                    breakpoints={{
                      640: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                      },
                      768: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                      },
                      1024: {
                        slidesPerView: 1.4,
                        spaceBetween: 30,
                      },
                      1280: {
                        slidesPerView: 1.5,
                        spaceBetween: 40,
                      },
                      1920: {
                        slidesPerView: 1.5,
                        spaceBetween: 50,
                      },
                    }}
                    className="overflow-hidden"
                  >
                    {ventures[0]?.ventures?.map((item, index) => (
                      <SwiperSlide key={index}>
                        <Link href={`/venture/${item?.slug}`}>
                          <VentureCard item={item} />
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
        {/* First Venture Section End */}
        {/* Second Venture Section */}

        {ventures[1] && (
          <motion.div
            className="
                    relative 
                    lg:!pe-[calc(((100%-var(--breakpoint-lg))/2)+var(--breakpoint-gap-lg))]
                    xl:!pe-[calc(((100%-var(--breakpoint-xl))/2)+var(--breakpoint-gap-xl))]
                    2xl:!pe-[calc(((100%-var(--breakpoint-2xl))/2)+var(--breakpoint-gap-2xl))]
                    3xl:!pe-[calc(((100%-var(--breakpoint-3xl))/2)+var(--breakpoint-gap-3xl)/2)]
                "
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Animated Background Dot */}
            <motion.div
              className="absolute top-0 bottom-0 left-[70px] 2xl:left-[100px] 3xl:left-[150px] m-auto w-[150px] 2xl:w-[200px] 3xl:w-[245px] h-[150px] 2xl:h-[200px] 3xl:h-[245px] blur-[165px] rounded-full bg-[#0B436A] animate-float"
              variants={floatDotVariants}
            />

            <div className="flex flex-wrap w-full flex-row-reverse">
              {/* LEFT CONTENT */}
              <div className="w-full lg:w-[240px] xl:w-[300px] 2xl:w-[400px] 3xl:w-[450px] flex items-center justify-end">
                <motion.div
                  className="w-full max-w-[75%] max-lg:text-center max-lg:m-auto"
                  variants={slideInFromRight}
                >
                  <motion.div variants={itemVariants}>
                    <Heading size="heading2" as="div">
                      {ventures[1]?.title}
                    </Heading>
                  </motion.div>

                  <motion.div
                    className="mb-[15px] lg:mb-[20px] xl:mb-[25px] 2xl:mb-[30px] 3xl:mb-[40px]"
                    variants={itemVariants}
                  >
                    {renderHtml(ventures[1]?.description)}
                  </motion.div>

                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    initial="rest"
                    animate="rest"
                  >
                    <Link href={`/venture`} className={CONTACT_BUTTON_CLASS}>
                      <span>{lang === "en" ? "View All" : "عرض الكل"}</span>
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
                    </Link>
                  </motion.div>
                </motion.div>
              </div>

              {/* RIGHT CONTENT - Swiper */}
              <div className="w-full lg:w-[calc(100%-240px)] xl:w-[calc(100%-300px)] 2xl:w-[calc(100%-400px)] 3xl:w-[calc(100%-450px)] max-lg:px-[35px] lg:pe-[60px] overflow-hidden">
                <motion.div
                  variants={slideInFromLeft}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <Swiper
                    dir={isRTL ? "rtl" : "ltr"}
                    modules={[Autoplay]}
                    autoplay={{ delay: 0, disableOnInteraction: false }}
                    speed={5000}
                    loop={true}
                    slidesPerView={2}
                    rewind={true}
                    spaceBetween={25}
                    breakpoints={{
                      640: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                      },
                      768: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                      },
                      1024: {
                        slidesPerView: 1.4,
                        spaceBetween: 30,
                      },
                      1280: {
                        slidesPerView: 1.5,
                        spaceBetween: 40,
                      },
                      1920: {
                        slidesPerView: 1.5,
                        spaceBetween: 50,
                      },
                    }}
                    className="overflow-hidden"
                  >
                    {ventures[1]?.ventures?.map((item, index) => (
                      <SwiperSlide key={index}>
                        <Link href={`/venture/${item?.slug}`}>
                          <VentureCard item={item} />
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Second Venture Section End */}
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
