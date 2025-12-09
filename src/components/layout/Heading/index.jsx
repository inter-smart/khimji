"use client";
import React from "react";

import { motion } from "framer-motion";

const textVariants = {
  offscreen: {
    y: 60,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "easeOuteaseOut",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const sizes = {
  heading1:
    "3xl:text-[54px] 2xl:text-[46px] xl:text-[40px] lg:text-[30px] md:text-28px] sm:text-[25px] text-[20px] font-medium leading-[1.2]",
  heading2:
    "text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] 3xl:text-[24px] font-medium leading-[1.5]",
  heading3:
    "text-[18px] sm:text-[20px] lg:text-[25px] xl:text-[30px] 2xl:text-[35px] 3xl:text-[46px] font-medium leading-[1.5]",
  heading5:
    "text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[20px] 2xl:text-[26px] 3xl:text-[30px] font-medium leading-[1.5]",
  heading6:
    "text-[10px] sm:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[20px] font-medium leading-[1.5]",
};

const Heading = ({ children, className = "", size, as, ...restProps }) => {
  const Component = as || "h6";

  return (
    <motion.div
      variants={textVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true }}
    >
      <Component className={`${className} ${sizes[size]}`} {...restProps}>
        {children}
      </Component>
    </motion.div>
  );
};

export { Heading };
