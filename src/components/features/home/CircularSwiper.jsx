"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { isRTLLocale } from "@/lib/countries";


const widthCir = `w-[300px] xl:w-[360px] 2xl:w-[400px] 3xl:w-[420px]`;
const highCir = `h-[300px] xl:h-[360px] 2xl:h-[400px] 3xl:h-[420px]`;

export default function CircularTimeline({timeline}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { locale } = useParams();
  const isRTL = isRTLLocale(locale);

  const circleRef = useRef(null);
  const contentRef = useRef(null);

  const [radius, setRadius] = useState(0);
  const [stepY, setStepY] = useState(0);

  /* Auto slide */
  useEffect(() => {
    if (timeline.length > 3) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % timeline.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, []);

  /* Circle radius */
  useEffect(() => {
    const updateRadius = () => {
      if (circleRef.current) {
        setRadius(circleRef.current.offsetWidth / 2 - 20);
      }
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  /* Right content step */
  useEffect(() => {
    const updateStep = () => {
      if (contentRef.current) {
        setStepY(contentRef.current.offsetHeight / 3);
      }
    };
    updateStep();
    window.addEventListener("resize", updateStep);
    return () => window.removeEventListener("resize", updateStep);
  }, []);

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full flex items-center relative gap-4 lg:gap-8">

        {/* LEFT CIRCLE */}
        <div
          ref={circleRef}
          className={`${widthCir} ${highCir} relative flex-shrink-0 ${isRTL ? "-scale-x-100" : ""}`}
        >
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#d1e5e0"
              strokeWidth="0.5"
              strokeDasharray="141 282"
            />
          </svg>

          <div className="absolute inset-[78px] rounded-full bg-[#1a8c7a]" />

          {/* DOTS CONTAINER */}
          <div
            className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform"
            style={{
              transform: `rotate(${-(activeIndex - 2) * 45}deg)`
            }}
          >
            {timeline.map((_, i) => {
              const isActive = i === activeIndex;

              return (
                <div
                  key={i}
                  className={`absolute top-1/2 left-1/2 transition-all duration-500 ease-out z-20 ${isActive ? "w-3.5 h-3.5" : "w-2 h-2"
                    }`}
                  style={{
                    transform: `
                      rotate(${(i - 2) * 45}deg)
                      translate(${radius}px)
                      rotate(${-(i - 2) * 45}deg)
                      translate(-50%, -50%)
                    `,
                  }}
                >
                  <div
                    className={`w-full h-full rounded-full transition-all duration-500 ease-out ${isActive
                      ? "bg-gradient-to-r from-[#0B436A] to-[#299B8A]"
                      : "bg-[#289889]"
                      }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 relative h-[300px] xl:h-[320px] 2xl:h-[400px] 3xl:h-[480px]">
          <div
            ref={contentRef}
            className="relative h-full overflow-hidden flex items-center"
          >
            {timeline.map((item, i) => {
              let offset = i - activeIndex;
              if (offset > timeline.length / 2) offset -= timeline.length;
              if (offset < -timeline.length / 2) offset += timeline.length;

              const isActive = offset === 0;

              return (
                <div
                  key={i}
                  className="absolute w-full transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform z-10"
                  style={{
                    transform: `translateY(${offset * stepY}px)`,
                    opacity: Math.max(0, 1 - Math.abs(offset) * 0.5),
                    pointerEvents: isActive ? "auto" : "none",
                    paddingInlineStart: isActive ? (isRTL ? "0px" : "40px") : "0px",
                    paddingInlineEnd: isActive ? (isRTL ? "40px" : "0px") : "0px",
                    transition:
                      "transform 0.8s cubic-bezier(0.4,0,0.2,1), opacity 0.6s ease, padding 0.6s ease",
                  }}
                >
                  <div className={`space-y-1 ${isRTL ? "text-right" : "text-left"}`}>
                    <div className="text-[16px] xl:text-[18px] 2xl:text-[23px] 3xl:text-[30px] font-light mb-[3px] transition-all duration-500">
                      {item.year}
                    </div>
                    <p className="text-[10px] xl:text-[12px] 2xl:text-[15px] 3xl:text-[20px] mb-[3px] transition-all duration-500">
                      {item.title}
                    </p>
                    <p className="text-[13px] xl:text-[15px] 2xl:text-[19px] 3xl:text-[25px] transition-all duration-500">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
