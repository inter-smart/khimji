"use client";
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

  return (
    <motion.div
      variants={textVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true }}
    >
      <Component className={`${className} ${sizes[size]} `} {...restProps}>
        {children}
      </Component>
    </motion.div>
  );
};

export { Text };
