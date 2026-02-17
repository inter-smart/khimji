"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Heading } from "@/components/layout/Heading";
import Link from "next/link";
import Image from "next/image";
import CircularSwiper from "./CircularSwiper";
import HeritageMobile from "./home-mobile/HeritageMobile";
import { renderHtml } from "@/lib/helper";

const CONTACT_BUTTON_CLASS = `
  text-[12px] 2xl:text-[16px] 3xl:text-[18px]
  text-black capitalize font-medium
  flex items-center group transition-all duration-300
  hover:text-[#299B8A] max-w-fit max-lg:mb-[25px]
`;

const ARROW_ICON_CLASS = `
  w-[14px] h-[14px] flex items-center
  mt-[5px] mx-[15px]
  transition-transform duration-300
  group-hover:translate-x-1
`;

/* ---------------- COUNTER COMPONENT WITH ANIMATION ---------------- */
const Counter = ({ end, suffix = "" }) => {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          setIsVisible(true);
          started.current = true;

          let start = 0;
          const duration = 1200;
          const startTime = performance.now();

          const animate = (time) => {
            const progress = Math.min((time - startTime) / duration, 1);
            const value = Math.floor(progress * end);
            setCount(value);

            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.6 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      {count}
      {suffix}
    </motion.span>
  );
};

export default function HeritageSection({ title, description, banner, banner_alt_text, metrics, timelines, image, image_alt, lang }) {
  const counterContainerRef = useRef(null);
  const isRTL = lang?.trim() === "ar";


  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.8,
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

  const fadeInUp = {
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

  const scaleIn = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const imageFrameVariants = {
    hidden: {
      opacity: 0,
      rotateY: -5,
      rotateX: 5,
    },
    visible: {
      opacity: 1,
      rotateY: 0,
      rotateX: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.4,
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
        delay: 0.5,
      },
    },
    hover: {
      x: isRTL ? -10 : 10,
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
      x: isRTL ? -5 : 5,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const counterItemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.2,
        ease: "easeOut",
      },
    }),
  };

  return (
    <>
      <section className="py-[60px_120px] bg-[#F9F9F9] relative overflow-hidden max-lg:hidden">
        <div className="container">
          <motion.div
            className="flex flex-wrap"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="w-full lg:w-1/2">
              <motion.div className="lg:max-w-[350px] 2xl:max-w-[450px] 3xl:max-w-[560px] w-full" variants={slideInFromLeft}>
                <motion.div variants={fadeInUp}>
                  <Heading size="heading1" as="h2">
                    {title}
                  </Heading>
                </motion.div>

                <motion.div className="mb-[15px] lg:mb-[20px] xl:mb-[25px] 2xl:mb-[30px] line-clamp-3 line-clamp-3" variants={fadeInUp}>
                  {renderHtml(description)}
                </motion.div>

                <motion.div variants={buttonVariants} whileHover="hover" initial="rest" animate="rest">
                  <Link href={`/heritage`} className={CONTACT_BUTTON_CLASS}>
                    <span>{lang === "ar" ? "اكتشف المزيد" : "Discover More"}</span>
                    <motion.div className={ARROW_ICON_CLASS} variants={arrowVariants}>
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

              <motion.div
                className="w-full relative lg:absolute start-[-180px] lg:start-[-190px] xl:start-[-200px] 2xl:start-[-260px] 3xl:start-[-280px] bottom-0 2xl:bottom-[60px] z-10 
                            before:absolute before:content-[''] before:bg-[#F9F9F9] before:start-0 xs:before:w-[33%] sm:before:w-[30%] before:md:w-[25%] before:top-0 before:h-full before:z-1 lg:before:hidden"
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <CircularSwiper timeline={timelines} lang={lang} />
              </motion.div>
            </div>

            <div className="w-full lg:w-1/2">
              <motion.div className="flex flex-wrap" variants={slideInFromRight}>
                <div className="w-[350px] xl:w-[400px] 2xl:w-[500px] 3xl:w-[650px]">
                  <motion.div
                    className="w-full h-full p-[15px] xl:p-[25px] 2xl:p-[30px] 3xl:p-[40px] rounded-[10px] overflow-hidden max-h-[750px] aspect-[530/660]
                                        border border-white bg-transparent
                                        backdrop-blur-[20px] backdrop-saturate-[180%]
                                        shadow-[inset_5px_1px_33px_#f1f1f1,inset_3px_-3px_5px_#fafafa]"
                    variants={imageFrameVariants}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="group w-full h-full overflow-hidden rounded-[10px] "
                    >
                      <Image
                        src={image}
                        className=" w-full h-full rounded-[10px] transition-transform duration-700 ease-out group-hover:scale-110
                                                "
                        width={285}
                        height={350}
                        alt={image_alt}
                      />
                    </motion.div>
                  </motion.div>
                </div>

                <div
                  className="w-[calc(100%-350px)] xl:w-[calc(100%-400px)] 2xl:w-[calc(100%-500px)] 3xl:w-[calc(100%-650px)] px-[45px] xl:px-[35px] 2xl:px-[45px] 3xl:px-[65px]"
                  ref={counterContainerRef}
                >
                  <div className="flex flex-wrap lg:flex-col h-full justify-between">
                    {metrics?.map((item, index) => (
                      <motion.div
                        key={item.key}
                        className="max-lg:w-1/2 lg:h-1/4 flex flex-col justify-center"
                        custom={index}
                        variants={counterItemVariants}
                      >
                        <Heading size="heading1" as="div" className="leading-none !mb-[8px]">
                          <Counter end={Number(item.value)} suffix={item?.suffix} />
                        </Heading>
                        <motion.p
                          className="uppercase mb-0 leading-relaxed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
                        >
                          {item?.key}
                        </motion.p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <HeritageMobile title={title} description={description} banner={banner} banner_alt_text={banner_alt_text} metrics={metrics} />
    </>
  );
}
