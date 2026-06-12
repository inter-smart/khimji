"use client";
import React, { useState, useEffect, useRef } from "react";

const sizes = {
  heading1:
    "text-[20px] sm:text-[24px] md:text-[28px] lg:text-[37px] xl:text-[43px] 2xl:text-[55px] 3xl:text-[70px] font-medium bg-gradient-to-r from-[#0B436A] to-[#299B8A] bg-clip-text text-transparent uppercase tracking-wide mb-[15px] 3xl:mb-[20px]",
  heading2:
    "text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[23px] 3xl:text-[30px] font-medium bg-gradient-to-r from-[#0B436A] to-[#299B8A] bg-clip-text text-transparent uppercase tracking-wide !mb-[10px] 2xl:!mb-[15px] 3xl:!mb-[20px]",
  heading3:
    "text-[18px] sm:text-[20px] lg:text-[25px] xl:text-[30px] 2xl:text-[35px] 3xl:text-[40px] font-medium bg-gradient-to-r from-[#0B436A] to-[#299B8A] bg-clip-text text-transparent uppercase tracking-wide !mb-[10px] 2xl:!mb-[15px] 3xl:!mb-[20px]",
  heading5:
    "text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[20px] 2xl:text-[26px] 3xl:text-[30px] font-medium bg-gradient-to-r from-[#0B436A] to-[#299B8A] bg-clip-text text-transparent uppercase tracking-wide !mb-[10px] 2xl:!mb-[15px] 3xl:!mb-[20px]",
  heading6:
    "text-[10px] sm:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[20px] font-medium leading-[1.5]",
};

const Heading = ({ children, className = "", size, as, ...restProps }) => {
  const Component = as || "h6";
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
      }`}
    >
      <Component className={`${className} ${sizes[size]}`} {...restProps}>
        {children}
      </Component>
    </div>
  );
};

export { Heading };
