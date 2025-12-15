"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";

const timeline = [
  {
    year: "1870",
    title: "Founded in Muscat trading house",
    desc: "Oman's earliest trusted business",
  },
  {
    year: "1895",
    title: "Expanded trade to India & Africa",
    desc: "Recognized for fair trade",
  },
  {
    year: "1920",
    title: "Expanded into construction & essential",
    desc: "Trusted supplier to Oman.",
  },
];

// fixed visual angles exactly like the reference image
// circular movement config
const RADIUS = 205;
const ANGLE_STEP = 40; // spacing between dots
const CENTER_ANGLE = 0; // center mode lock

export default function CircularSwiper() {
  const [activeIndex, setActiveIndex] = useState(1); // center item active

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-[#f6f8f7]">
      <div className="relative w-full max-w-6xl flex items-center gap-20">

        {/* LEFT STATIC CIRCLE */}
        <div className="relative w-[420px] h-[420px] flex items-center justify-center">
          {/* outer arc */}
          <div className="absolute inset-0 rounded-full border border-teal-200/60" />

          {/* filled inner circle */}
          <div className="absolute w-[300px] h-[300px] rounded-full bg-[#1f9c8b]" />

          {/* dots aligned to text (static like image) */}
          {/* CIRCULAR MOVING DOTS – CENTER MODE */}
          <div
            className="absolute inset-0 transition-transform duration-700 ease-in-out"
            style={{ transform: `rotate(${-activeIndex * ANGLE_STEP}deg)` }}
          >
            {[-1, 0, 1].map((offset, i) => {
              const angle = CENTER_ANGLE + offset * ANGLE_STEP;
              return (
                <span
                  key={i}
                  className={`absolute rounded-full transition-all duration-300 ${
                    offset === 0
                      ? "w-3.5 h-3.5 bg-[#1f9c8b]"
                      : "w-2.5 h-2.5 bg-teal-300"
                  }`}
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${angle}deg) translate(${RADIUS}px)`,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* RIGHT CONTENT – EXACTLY 3 ITEMS VISIBLE */}
        <div className="flex-1">
          <Swiper
            direction="vertical"
            slidesPerView={3}
            centeredSlides
            loop
            speed={600}
            mousewheel={{ forceToAxis: true }}
            modules={[Mousewheel]}
            onSlideChange={(s) => setActiveIndex(s.realIndex)}
            className="h-[420px]"
          >
            {timeline.map((item, i) => (
              <SwiperSlide key={i}>
                <div
                  className={`space-y-3 transition-all duration-300 ${
                    i === activeIndex ? "opacity-100" : "opacity-60"
                  }`}
                >
                  <h2 className="text-[40px] font-light text-black">
                    {item.year}
                  </h2>
                  <p className="text-lg text-black font-medium">
                    {item.title}
                  </p>
                  <p className="text-base text-gray-600 max-w-md">
                    {item.desc}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
