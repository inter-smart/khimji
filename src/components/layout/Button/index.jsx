"use client";
import React from "react";
import PropTypes from "prop-types"; 
import Link from "next/link";

const buttonVariants = {
  offscreen: {
    scale: 0,
    opacity: 0,
  },
  onscreen: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "easeOuteaseOut",
      bounce: 0.4,
      duration: 0.4,
    },
  },
};

const variants = {
  fill: {
    white: "text-black bg-white border-white hover:bg-[#9747FF] hover:border-[#9747FF] hover:text-white",
    black: "text-white bg-black border-black hover:bg-base1 hover:border-base1 hover:text-black",
    base1:
      "text-white bg-base1 border-base1 hover:bg-base1/90 hover:text-white",
  },
};

const sizes = {
  button1:
    "3xl:text-[14px] 2xl:text-[12px] xl:text-[9px] lg:text-[9px] text-[9px] font-medium leading-none text-center whitespace-nowrap w-full h-[25px] sm:h-[30px] lg:h-[33px] 2xl:h-[43px] 3xl:h-[50px] flex flex-row items-center justify-center gap-[5px] lg:gap-[10px] 3xl:gap-[14px] p-[5px] cursor-pointer rounded-none border border-solid",
};

 

export { Button, LinkButton };
