"use client";
import { motion } from "framer-motion";
import { Heading } from "@/components/layout/Heading";
import { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function HeritageSection({ title, timelines, data, lang }) {
  const isRTL = lang?.trim() === "ar";


  const getPointOnQuadraticBezier = (t, p0, p1, p2) => {
    const x = Math.pow(1 - t, 2) * p0.x + 2 * (1 - t) * t * p1.x + Math.pow(t, 2) * p2.x;
    const y = Math.pow(1 - t, 2) * p0.y + 2 * (1 - t) * t * p1.y + Math.pow(t, 2) * p2.y;
    return { x, y };
  };

  const getPointOnCurve = (xPercent) => {
    const t = xPercent / 100;
    const p0 = { x: 0, y: 60 };
    const p1 = { x: 50, y: 15 };
    const p2 = { x: 100, y: 60 };

    const point = getPointOnQuadraticBezier(t, p0, p1, p2);
    return point;
  };

  const autoplayOptions = {
    delay: 2000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "center",
      loop: true,
      skipSnaps: false,
      dragFree: false,
      speed: 1.2,
      direction: isRTL ? "rtl" : "ltr",
    },
    [Autoplay(autoplayOptions)]
  );

  const sectionRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [circlePosition, setcirclePosition] = useState([]);

  const updatecirclePosition = useCallback(() => {
    if (!emblaApi || !sectionRef.current) return;

    const slides = emblaApi.slideNodes();
    const container = sectionRef.current;
    const containerRect = container.getBoundingClientRect();
    const newPositions = [];
    const totalSlides = slides.length;

    slides.forEach((slide, index) => {
      const slideRect = slide.getBoundingClientRect();
      const slideCenter = slideRect.left + slideRect.width / 2;
      const containerLeft = containerRect.left;
      const containerWidth = containerRect.width;

      const relativeX = ((slideCenter - containerLeft) / containerWidth) * 100;

      let distanceFromCenter = Math.abs(index - selectedIndex);
      if (distanceFromCenter > totalSlides / 2) {
        distanceFromCenter = totalSlides - distanceFromCenter;
      }

      if (distanceFromCenter <= 1 && relativeX >= 0 && relativeX <= 100) {
        const curvePoint = getPointOnCurve(relativeX);
        const isCenter = index === selectedIndex;

        newPositions.push({
          index,
          x: curvePoint.x,
          y: curvePoint.y,
          isCenter,
          visible: true,
        });
      }
    });

    setcirclePosition(newPositions);
  }, [emblaApi, selectedIndex]);

  const rafRef = useRef(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const onScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      updatecirclePosition();
      rafRef.current = null;
    });
  }, [updatecirclePosition]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    updatecirclePosition();

    emblaApi.on("select", onSelect);
    emblaApi.on("scroll", onScroll);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("reInit", updatecirclePosition);
    emblaApi.on("resize", updatecirclePosition);

    const timer = setTimeout(updatecirclePosition, 100);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("scroll", onScroll);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("reInit", updatecirclePosition);
      emblaApi.off("resize", updatecirclePosition);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [emblaApi, onSelect, onScroll, updatecirclePosition]);
  return (
    <section
      ref={sectionRef}
      className="[--gradient:80px] sm:[--gradient:120px] lg:[--gradient:200px] 2xl:[--gradient:250px] 3xl:[--gradient:320px] w-full h-auto py-[40px_20px] sm:py-[40px_50px] lg:py-[60px_70px] 2xl:py-[70px_100px] 3xl:py-[90px_125px] block relative z-0"
    >
      <div className="w-[var(--gradient)] h-[var(--gradient)] bg-[#2FDDC3] my-auto rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[120px] block absolute -z-1 inset-[0_auto_0_-7%] animate-float"></div>
      <div className="w-[var(--gradient)] h-[var(--gradient)] bg-[#1A9BF5] my-auto rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[120px] opacity-45 block absolute -z-1 inset-[0_-7%_0_auto]"></div>
      <div className="container">
        <Heading as="h2" size="heading1" className="text-center !mb-[50px] sm:!mb-[40px] 2xl:!mb-[60px] 3xl:!mb-[80px]">
          {title}
        </Heading>
      </div>
      <div className="w-full translate-y-[30px] sm:translate-y-[0px] lg:translate-y-[40px] 2xl:translate-y-[30px] pointer-events-none absolute z-1 inset-0">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#29998A" />
              <stop offset="50%" stopColor="#29998A" />
              <stop offset="100%" stopColor="#29998A" />
            </linearGradient>
          </defs>
          <path d="M 0,60 Q 50,15 100,60" fill="none" stroke="url(#curveGradient)" strokeWidth="0.4" opacity="0.1" />
        </svg>
      </div>
      <div className="translate-y-[30px] sm:translate-y-[0px] lg:translate-y-[40px] 2xl:translate-y-[30px] overflow-hidden pointer-events-none absolute z-2 inset-0">
        {circlePosition.map((item, index) => (
          <div
            key={`dot-${index}`}
            className="absolute rounded-full shadow-md flex items-center justify-center overflow-hidden"
            style={{
              left: `${item?.x}%`,
              top: `${item?.y}%`,
              transform: "translate(-50%, -50%)",
              width: item?.isCenter ? "20px" : "10px",
              height: item?.isCenter ? "20px" : "10px",
              opacity: item?.visible ? 1 : 0,
              transition: "width 0.4s ease, height 0.4s ease, opacity 0.3s ease",
            }}
          >
            <div className="absolute inset-0 bg-[#289889]" />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(90deg, #0B436A 0%, #299B8A 100%)",
                opacity: item?.isCenter ? 1 : 0,
                transition: "opacity 0.4s ease",
              }}
            />
          </div>
        ))}
      </div>
      <div className="container">
        <div className="w-full h-auto pt-[50px] sm:pt-[70px] lg:pt-[70px] 2xl:pt-[100px] overflow-hidden relative z-2" ref={emblaRef}>
          <div className="flex">
            {timelines?.map((item, index) => (
              <div key={index} className="flex-[0_0_100%] sm:flex-[0_0_33.333%] px-4">
                <motion.div
                  className={`w-full h-full flex flex-col text-center select-none ${index === selectedIndex ? "" : "mt-0"}`}
                  animate={{
                    opacity: index === selectedIndex && 1,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <div className="text-[18px] sm:text-[20px] text-[24px] 3xl:text-[30px] leading-[1.2] font-normal text-black mb-[5px]">
                    {item?.year}
                  </div>
                  <div className="text-[13px] sm:text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-[1.2] font-normal text-black mb-[5px]">
                    {item?.title}
                  </div>
                  {/* <div className="text-[14px] sm:text-[16px] 2xl:text-[20px] 3xl:text-[25px] leading-[1.2] font-normal text-black">
                    {item?.subtitle}
                  </div> */}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
