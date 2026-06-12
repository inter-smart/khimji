"use client";
import React, { useState, useEffect, useRef } from "react";

const sizes = {
  text1:
    "3xl:text-[20px] 2xl:text-[17px] xl:text-[13px] lg:text-[12px] text-[12px] font-normal leading-[1.5]",
  text2:
    "2xl:text-[16px] xl:text-[13px] lg:text-[12px] text-[11px] font-normal leading-[1.5]",
  text3:
    "3xl:text-[25px] 2xl:text-[21px] xl:text-[16px] lg:text-[14px] text-[12px] font-normal leading-normal",
  text4:
    "3xl:text-[18px] 2xl:text-[16px] xl:text-[12px] text-[12px] font-normal leading-normal",
};

const Text = ({ children, className = "", as, size, ...restProps }) => {
  const Component = as || "p";
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
      <Component className={`${className} ${sizes[size]} `} {...restProps}>
        {children}
      </Component>
    </div>
  );
};

export { Text };
