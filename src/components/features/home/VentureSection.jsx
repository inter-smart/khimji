"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";
import { Heading } from "@/components/layout/Heading";
import Link from "next/link";

const CONTACT_BUTTON_CLASS = "text-[12px] 2xl:text-[16px] 3xl:text-[18px] text-black capitalize font-medium flex items-center group transition-all duration-300 hover:text-[#299B8A]";
const ARROW_ICON_CLASS = "w-[14px] h-[14px] flex items-center mt-[5px] mx-[15px] transition-transform duration-300 group-hover:translate-x-1";

export default function VentureSection() {
    return (
        <section className='relative z-0 py-[45px] 2xl:py-[80px_50px] 3xl:py-[100px_70px] overflow-hidden '>
            <div className="container">
                <Heading
                    size="heading1"
                    as="h2"
                    className="text-center"  >
                    Ventures
                </Heading>
            </div>
            <div className="container">
                <div className="flex flex-wrap">
                    <div className="w-[350px]">
                        <Heading
                            size="heading2"
                            as="div"
                        >
                            Corporate Oriented
                        </Heading>
                        <p className="mb-[40px]">Khimji Ramdas drives growth across Retail, Infrastructure,
                            Logistics, Lifestyle, and Travel.
                            Through strong joint ventures and international presence,
                            we connect markets and enrich communities</p>
                        <Link href="#!" className={CONTACT_BUTTON_CLASS}>
                            View All
                            <div className={ARROW_ICON_CLASS}>
                                <svg className="w-full h-full object-cover" viewBox="0 0 14 15" >
                                    <g clipPath="url(#clip0_1055_230)">
                                        <path d="M7.23334 12.7448C7.14887 12.7465 7.0637 12.7245 6.98857 12.6748C6.7718 12.5318 6.70577 12.2213 6.8362 11.9893C6.84717 11.9688 8.2096 9.53275 10.8103 7.99975H0.700004C0.442637 7.99975 0.233337 7.7755 0.233337 7.49975C0.233337 7.224 0.442637 6.99975 0.700004 6.99975H10.8103C8.22407 5.4755 6.84624 3.02875 6.8327 3.00425C6.70507 2.77075 6.77577 2.46 6.99347 2.32175C7.2142 2.1815 7.50494 2.26275 7.63677 2.5005C7.84887 2.863 9.8378 6.11275 13.4052 7.012C13.6187 7.06825 13.7667 7.2685 13.7667 7.5C13.7667 7.7315 13.6197 7.93225 13.4092 7.987C9.8266 8.8895 7.84444 12.1435 7.63024 12.5118C7.54624 12.656 7.39084 12.7415 7.23334 12.7448Z" fill="black" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1055_230">
                                            <rect width="14" height="15" fill="black" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </Link>
                    </div>
                    <div className="w-[calc(100%-350px)] pl-[50px]">
                        <Swiper
                            modules={[Autoplay]}
                            autoplay={{ delay: 0, disableOnInteraction: false }}
                            speed={2500}
                            loop={true}
                            slidesPerView={2}
                            spaceBetween={25}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 1.2},
                                1280: { slidesPerView: 1.3 },
                            }}
                            className="!overflow-visible"

                        >
                            <SwiperSlide>
                                {/* Enhanced glass effect with backdrop filters */}
                                <div className="relative z-0 w-full h-full overflow-hidden p-[20px] border border-white rounded-xl flex flex-wrap backdrop-blur-lg backdrop-saturate-150 backdrop-filter bg-gradient-to-br from-white/0 to-white/0 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/25 before:to-transparent before:rounded-xl before:z-[-1] after:absolute after:inset-0 after:bg-white/5 after:backdrop-blur-sm after:rounded-xl after:z-[-2]">
                                    <div className="w-[200px]">
                                        <div className="w-full h-full overflow-hidden rounded-[10px] backdrop-blur-sm">
                                            <video
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                className="w-full h-full object-cover"
                                            >
                                                <source src="/videos/venture-1.mp4" type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    </div>
                                    <div className="w-[calc(100%-200px)]">
                                        <div className="w-full px-[35px]">
                                            <div className="text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[23px] 3xl:text-[30px]
                                                font-medium bg-gradient-to-r from-[#0B436A] to-[#299B8A] bg-clip-text text-transparent uppercase 
                                                mb-[10px] 2xl:mb-[15px] 3xl:mb-[25px]">
                                                Logistics & Shipping
                                            </div>
                                            <p >Khimji Ramdas Shipping and Multimodal Logistics , KRHL (Khimji Ramdas Heavy Lift),
                                                Schenker Khimji's LLC, Khimji's Sparkle Marine Services SAOC, Middle East Fuji Khimji LLC</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    )
}