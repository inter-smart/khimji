"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import Link from "next/link";
import { useParams } from "next/navigation";
import { isRTLLocale } from "@/lib/countries";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Image from "next/image";
import VentureCard from "@/components/common/VentureCard";


const VENTURE_SLIDES = [
    {
        video: "/videos/venture-1.mp4",
        mobileImage: "/images/vetureCard-1.jpg",
        title: "Logistics & Shipping",
        description:
            "Khimji Ramdas Shipping and Multimodal Logistics , KRHL (Khimji Ramdas Heavy Lift), Schenker Khimji's LLC, Khimji's Sparkle Marine Services SAOC, Middle East Fuji Khimji LLC",
        logos: [
            "/images/ship-1.png",
            "/images/ship-2.png",
            "/images/ship-3.png",
            "/images/ship-4.png",
        ],
    },
    {
        video: "/videos/venture-2.mp4",
        mobileImage: "/images/vetureCard-1.jpg",
        title: "Logistics & Shipping",
        description:
            "Khimji Ramdas Shipping and Multimodal Logistics , KRHL (Khimji Ramdas Heavy Lift), Schenker Khimji's LLC, Khimji's Sparkle Marine Services SAOC, Middle East Fuji Khimji LLC",
        logos: [
            "/images/ship-1.png",
            "/images/ship-2.png",
            "/images/ship-3.png",
            "/images/ship-4.png",
        ],
    },
];


export default function VentureSectionmob() {
    const { locale } = useParams();
    const isRTL = isRTLLocale(locale);

    return (
        <section className="sm:hidden mt-[3px]">
            <div className="w-full h-[290px] relative before:absolute before:left-0 before:content-[''] before:bottom-0 before:w-full before:h-full before:bg-black/40 before:z-1">
                <Image src="/images/verture-mob.jpg" width="441" height="290" className="absolute top-0 left-0 w-full h-full object-cover" alt="venture_img" />
                <div className="container flex items-end h-full">
                    <div className="relative w-full py-[25px] z-1">
                        <div className="text-[43px] text-white font-medium uppercase">Ventures</div>
                    </div>
                </div>
            </div>
            <div className="container">
                <Tabs defaultValue="corporate" className="w-full m-[35px_0px]">
                    {/* Tabs Header */}
                    <TabsList className="flex items-center w-full bg-transparent -m-[3px]">
                        <div className="w-1/2 px-[3px]">
                            <TabsTrigger
                                value="corporate"
                                className=" w-full
                                text-[11px] xs:text-[16px]
                                border border-[#2E8B8B]
                                data-[state=active]:bg-gradient-to-r
                                data-[state=active]:from-[#0B436A]
                                data-[state=active]:to-[#299B8A]
                                data-[state=active]:text-white
                                data-[state=inactive]:text-[#000000]
                                rounded-none py-3  font-medium"  >
                                CORPORATE ORIENTED
                            </TabsTrigger>
                        </div>

                        <div className="w-1/2 px-[3px]">
                            <TabsTrigger
                                value="consumer"
                                className="w-full
                                text-[11px] xs:text-[16px]
                                border border-[#2E8B8B]
                                data-[state=active]:bg-gradient-to-r
                                data-[state=active]:from-[#0B436A]
                                data-[state=active]:to-[#299B8A]
                                data-[state=active]:text-white
                                data-[state=inactive]:text-[#000000]
                                rounded-none py-3  font-medium "  >
                                CONSUMER ORIENTED
                            </TabsTrigger>
                        </div>
                    </TabsList>

                    {/* Content */}
                    <TabsContent value="corporate" className="mt-6 text-center">
                        <h3 className="text-[22px] text-[#0B436A] font-medium mb-3">
                            CORPORATE ORIENTED
                        </h3>
                        <p className="text-[#000000] leading-relaxed">
                            Khimji Ramdas drives growth across Retail, Infrastructure,
                            Logistics, Lifestyle, and Travel. Through strong joint ventures
                            and international presence, we connect markets and enrich
                            communities.
                        </p>

                        <div className="relative mt-[20px]">
                            <Swiper
                                dir={isRTL ? "rtl" : "ltr"}
                                modules={[Navigation]}
                                navigation={{
                                    nextEl: '.swiper-button-next-custom',
                                    prevEl: '.swiper-button-prev-custom',
                                }}
                                loop={true}
                                rewind={true}
                                slidesPerView={1}
                                spaceBetween={10}
                                className="overflow-hidden h-[470px]"
                            >
                                {VENTURE_SLIDES.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <VentureCard item={item} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Custom Navigation Buttons */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                                <button className="swiper-button-prev-custom w-10 h-10 flex items-center justify-center
                                 bg-[#404040] hover:bg-[#1a1a1a]/90 rounded-full transition-all">
                                    <svg width="14" height="13" viewBox="0 0 14 13"  >
                                        <path d="M0.245461 6.76385C-0.0818138 6.43657 -0.0818138 5.90596 0.245461 5.57868L5.57871 0.245433C5.90598 -0.0818415 6.4366 -0.0818415 6.76388 0.245433C7.09115 0.572708 7.09115 1.10332 6.76388 1.4306L2.02321 6.17126L6.76388 10.9119C7.09115 11.2392 7.09115 11.7698 6.76388 12.0971C6.4366 12.4244 5.90598 12.4244 5.57871 12.0971L0.245461 6.76385ZM13.6497 6.17126V7.0093H0.838044V6.17126V5.33323H13.6497V6.17126Z" fill="white" />
                                    </svg>
                                </button>
                                <button className="swiper-button-next-custom w-10 h-10 flex items-center justify-center 
                                bg-[#404040] hover:bg-[#1a1a1a]/90 rounded-full transition-all">
                                    <svg width="14" height="13" viewBox="0 0 14 13"  >
                                        <path d="M13.4042 6.76385C13.7315 6.43657 13.7315 5.90596 13.4042 5.57868L8.07099 0.245433C7.74372 -0.0818413 7.2131 -0.0818413 6.88583 0.245433C6.55855 0.572708 6.55855 1.10332 6.88583 1.4306L11.6265 6.17126L6.88583 10.9119C6.55855 11.2392 6.55855 11.7698 6.88583 12.0971C7.2131 12.4244 7.74372 12.4244 8.07099 12.0971L13.4042 6.76385ZM0 6.17126V7.0093H12.8117V6.17126V5.33323H0V6.17126Z" fill="white" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <Link href="#!" className="text-[16px] xs:text-[18px] text-[#000000] font-medium w-fit flex items-center justify-center mt-[20px] h-[40px] xs:h-[50px]
                           min-w-[120px] xs:min-w-[140px] p-[8px] border border-[#000000] m-auto">
                            View All
                            <div className="w-[14px] xs:w-[17px] h-[14px] flex items-center mx-[10px]">
                                <svg className="w-full h-full object-contain" viewBox="0 0 18 14" >
                                    <g clipPath="url(#clip0_1342_4984)">
                                        <path d="M9.38156 13.4279C9.27201 13.43 9.16155 13.4034 9.0641 13.3431C8.78295 13.17 8.69731 12.7942 8.86648 12.5133C8.8807 12.4885 10.6478 9.53965 14.0209 7.68392H0.907875C0.574073 7.68392 0.302612 7.41246 0.302612 7.07865C0.302612 
                                        6.74485 0.574073 6.47339 0.907875 6.47339H14.0209C10.6665 4.62824 8.87949 1.66639 8.86194 1.63673C8.6964 1.35407 8.7881 0.977903 
                                        9.07045 0.810547C9.35674 0.640771 9.73382 0.739126 9.90481 1.02693C10.1799 1.46574 12.7595 5.39965 17.3865 6.48822C17.6634 6.55631 17.8552 6.79872 17.8552 
                                        7.07896C17.8552 7.35919 17.6646 7.60221 17.3916 7.66848C12.745 8.76098 10.1742 12.7 9.89634 13.1458C9.78739 13.3204 9.58584 13.4239 9.38156 13.4279Z" fill="black" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1342_4984">
                                            <rect width="18" height="14" fill="black" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </Link>


                    </TabsContent>

                    <TabsContent value="consumer" className="mt-6 text-center">
                        <h3 className="text-[22px] text-[#0B436A] text-lg font-medium mb-3">
                            CONSUMER ORIENTED
                        </h3>
                        <p className="text-[20px]] text-[#000000]  leading-relaxed">
                            Focused on customer-centric brands delivering value, innovation,
                            and long-term trust across diverse consumer markets.
                        </p>
                    </TabsContent>

                </Tabs>
            </div>
        </section>
    )
}