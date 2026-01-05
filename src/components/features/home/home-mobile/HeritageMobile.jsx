"use client";

import Image from "next/image";
import { renderHtml } from "@/lib/helper";

export default function HeritageMobile({ title, description, banner, banner_alt_text, metrics }) {
  return (
    <section className="relative py-[55px] before:absolute before:top-0 before:left-0 before:bg-black/20 before:content-[''] before:w-full before:h-full lg:hidden h-[820px]">
      <Image src={banner} width="450" height="820" className="w-full h-full object-cover absolute top-0 left-0" alt={banner_alt_text} />
      <div className="container relative flex items-end h-full">
        <div className="w-full">
          <div className="text-[43px] text-white font-medium uppercase">{title}</div>
          <p className="[&_p]:text-white">{renderHtml(description)}</p>

          <div className="flex flex-wrap -m-[4px] xs:-m-[9px] mt-[30px]">
            <div className="w-1/2 p-[4px] xs:p-[9px]">
              <div
                className="
                                    w-full h-full
                                    backdrop-blur-[2px]
                                    rounded-[10px]
                                    p-[10px] xs:p-[12px]
                                    border border-white/35
                                    shadow-[inset_-2px_-1px_3px_#f1f1f14a,inset_1px_1px_0px_#fafafa6e]"
              >
                <div className="text-[30px] xs:text-[35px] text-white font-semibold">
                  {metrics?.value_1} <span>+</span>
                </div>
                <div className="text-[12px] text-white uppercase">{metrics?.label_1}</div>
              </div>
            </div>
            <div className="w-1/2 p-[4px] xs:p-[9px]">
              <div
                className="
                                    w-full h-full
                                    backdrop-blur-[2px]
                                    rounded-[10px]
                                    p-[12px]
                                    border border-white/35
                                    shadow-[inset_-2px_-1px_3px_#f1f1f14a,inset_1px_1px_0px_#fafafa6e]"
              >
                <div className="text-[30px] xs:text-[35px] text-white font-semibold ">
                  {metrics?.value_2} <span>K+</span>
                </div>
                <div className="text-[12px] text-white uppercase">{metrics?.label_2}</div>
              </div>
            </div>
            <div className="w-1/2 p-[4px] xs:p-[9px]">
              <div
                className="
                                    w-full h-full
                                    backdrop-blur-[2px]
                                    rounded-[10px]
                                    p-[12px]
                                    border border-white/35
                                    shadow-[inset_-2px_-1px_3px_#f1f1f14a,inset_1px_1px_0px_#fafafa6e]"
              >
                <div className="text-[30px] xs:text-[35px] text-white font-semibold ">
                  {metrics?.value_3} <span>+</span>
                </div>
                <div className="text-[12px] text-white uppercase">Verticals</div>
              </div>
            </div>
            <div className="w-1/2 p-[4px] xs:p-[9px]">
              <div
                className="
                                    w-full h-full
                                    backdrop-blur-[2px]
                                    rounded-[10px]
                                    p-[12px]
                                    border border-white/35
                                    shadow-[inset_-2px_-1px_3px_#f1f1f14a,inset_1px_1px_0px_#fafafa6e]"
              >
                <div className="text-[35px] text-white font-semibold">
                  {metrics?.value_4} <span>+</span>
                </div>
                <div className="text-[12px] text-white uppercase">{metrics?.label_4}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
