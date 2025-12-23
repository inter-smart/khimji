"use client";

import Image from "next/image";
import { useCountry } from "@/context/CountryContext";

export default function HeritageMobile() {
    const { countryData } = useCountry();

    return (
        <section className="relative py-[55px] before:absolute before:top-0 before:left-0 before:bg-black/20 before:content-[''] before:w-full before:h-full lg:hidden h-[820px]">
            <Image src="/images/heritageMob.jpg" width="450" height="820" className="w-full h-full object-cover absolute top-0 left-0" alt="heritage_img" />
            <div className="container relative flex items-end h-full">
                <div className="w-full">
                    <div className="text-[43px] text-white font-medium uppercase">Heritage</div>
                    <p className="text-white">
                        For over 150 years, Khimji Ramdas has driven {countryData.name}’s progress, blending tradition with innovation and
                        connecting global brands to local markets. Guided by strong values, we create opportunities, empower lives, and foster sustainable growth
                    </p>

                    <div className="flex flex-wrap -m-[4px] xs:-m-[9px] mt-[30px]">
                        <div className="w-1/2 p-[4px] xs:p-[9px]">
                            <div className="
                                    w-full h-full
                                    backdrop-blur-[2px]
                                    rounded-[10px]
                                    p-[10px] xs:p-[12px]
                                    border border-white/35
                                    shadow-[inset_-2px_-1px_3px_#f1f1f14a,inset_1px_1px_0px_#fafafa6e]" >
                                <div className="text-[30px] xs:text-[35px] text-white font-semibold">
                                    400 <span>+</span>
                                </div>
                                <div className="text-[12px] text-white uppercase">
                                    BRANDS
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2 p-[4px] xs:p-[9px]">
                            <div className="
                                    w-full h-full
                                    backdrop-blur-[2px]
                                    rounded-[10px]
                                    p-[12px]
                                    border border-white/35
                                    shadow-[inset_-2px_-1px_3px_#f1f1f14a,inset_1px_1px_0px_#fafafa6e]" >
                                <div className="text-[30px] xs:text-[35px] text-white font-semibold ">
                                    5 <span>K+</span>
                                </div>
                                <div className="text-[12px] text-white uppercase">
                                    Employees
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2 p-[4px] xs:p-[9px]">
                            <div className="
                                    w-full h-full
                                    backdrop-blur-[2px]
                                    rounded-[10px]
                                    p-[12px]
                                    border border-white/35
                                    shadow-[inset_-2px_-1px_3px_#f1f1f14a,inset_1px_1px_0px_#fafafa6e]" >
                                <div className="text-[30px] xs:text-[35px] text-white font-semibold ">
                                    40 <span>+</span>
                                </div>
                                <div className="text-[12px] text-white uppercase">
                                    Verticals
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2 p-[4px] xs:p-[9px]">
                            <div className="
                                    w-full h-full
                                    backdrop-blur-[2px]
                                    rounded-[10px]
                                    p-[12px]
                                    border border-white/35
                                    shadow-[inset_-2px_-1px_3px_#f1f1f14a,inset_1px_1px_0px_#fafafa6e]" >
                                <div className="text-[35px] text-white font-semibold">
                                    150 <span>+</span>
                                </div>
                                <div className="text-[12px] text-white uppercase">
                                    Years
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
